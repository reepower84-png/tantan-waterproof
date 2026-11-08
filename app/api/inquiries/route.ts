import { NextRequest, NextResponse } from "next/server";
import { supabase, Inquiry } from "@/lib/supabase";
import { backupFetch } from "../../../lib/inquiry-backup";

// Discord 웹훅으로 알림 전송
async function sendDiscordNotification(inquiry: Inquiry) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("Discord webhook URL is not configured");
    return;
  }

  const message = {
    embeds: [
      {
        title: "새로운 상담 문의가 접수되었습니다!",
        color: 3447003,
        fields: [
          {
            name: "이름",
            value: inquiry.name,
            inline: true,
          },
          {
            name: "전화번호",
            value: inquiry.phone,
            inline: true,
          },
          {
            name: "문의 내용",
            value: inquiry.message || "(내용 없음)",
            inline: false,
          },
          {
            name: "접수 시간",
            value: new Date(inquiry.created_at).toLocaleString("ko-KR", {
              timeZone: "Asia/Seoul",
            }),
            inline: false,
          },
        ],
        footer: {
          text: "탄탄방수타일",
        },
        timestamp: inquiry.created_at,
      },
    ],
  };

  try {
    await backupFetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error("Failed to send Discord notification:", error);
  }
}

// GET - 모든 문의 조회
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to get inquiries" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to get inquiries:", error);
    return NextResponse.json({ error: "Failed to get inquiries" }, { status: 500 });
  }
}

// POST - 새 문의 접수 (Discord 다이렉트 알림)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Discord 웹훅으로 직접 알림 전송
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Discord webhook URL is not configured");
      return NextResponse.json({ error: "Notification service not configured" }, { status: 500 });
    }

    const now = new Date();
    const discordMessage = {
      embeds: [
        {
          title: "🔔 새로운 상담 문의가 접수되었습니다!",
          color: 3447003,
          fields: [
            {
              name: "이름",
              value: name,
              inline: true,
            },
            {
              name: "전화번호",
              value: phone,
              inline: true,
            },
            {
              name: "문의 내용",
              value: message || "(내용 없음)",
              inline: false,
            },
            {
              name: "접수 시간",
              value: now.toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
              }),
              inline: false,
            },
          ],
          footer: {
            text: "탄탄방수타일",
          },
          timestamp: now.toISOString(),
        },
      ],
    };

    const discordResponse = await backupFetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    });

    if (!discordResponse.ok) {
      console.error("Discord webhook failed:", discordResponse.status);
      return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
    }

    return NextResponse.json({ success: true, name, phone, message }, { status: 201 });
  } catch (error) {
    console.error("Failed to process inquiry:", error);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}

// PATCH - 문의 상태 업데이트
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["대기중", "연락완료", "상담완료"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to update inquiry:", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

// DELETE - 문의 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
