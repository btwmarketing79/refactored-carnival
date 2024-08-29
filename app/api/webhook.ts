import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('Received body:', body);

  if (body.message && body.message.text === '/start') {
    console.log('Received /start command');
    const chatId = body.message.chat.id;
    const text = 'Welcome to the bot!';

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.description);
      }

      return NextResponse.json(data);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      } else {
        return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
      }
    }
  } else {
    return NextResponse.json({ message: 'OK' });
  }
}