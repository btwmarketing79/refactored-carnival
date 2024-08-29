import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received body:', body);

    if (body.message && body.message.text === '/start') {
      console.log('Received /start command');
      const chatId = body.message.chat.id;
      const text = 'Welcome to the bot!';

      const token = process.env.TELEGRAM_BOT_TOKEN;
      console.log('Telegram Bot Token:', token);
      const url = `https://api.telegram.org/bot${token}/sendMessage`;

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
      console.log('Telegram API response:', data);

      if (!response.ok) {
        throw new Error(data.description);
      }

      return NextResponse.json(data);
    } else {
      return NextResponse.json({ message: 'OK' });
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}