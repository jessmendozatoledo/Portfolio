import { NextResponse } from 'next/server';
import { generateBotResponse } from '@/app/data/chatbotKnowledge';

const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

// Handles GET requests for webhook verification
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      // Facebook expects the challenge string back in the exact format
      return new NextResponse(challenge, { status: 200 });
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return NextResponse.json({ message: "Webhook is listening" }, { status: 200 });
}

// Handles POST requests (incoming messages)
export async function POST(request) {
  try {
    const body = await request.json();

    // Make sure this is a page subscription
    if (body.object === "page") {
      // Iterate over each entry (there may be multiple if batched)
      for (const entry of body.entry) {
        // Get the webhook event. entry.messaging is an array, but 
        // will only ever contain one event, so we get index 0
        const webhook_event = entry.messaging[0];
        
        // Get the sender PSID
        const sender_psid = webhook_event.sender.id;
        console.log("Sender PSID: " + sender_psid);

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhook_event.message && webhook_event.message.text) {
          await handleMessage(sender_psid, webhook_event.message);
        }
      }

      // Return a '200 OK' response to all events
      return new NextResponse("EVENT_RECEIVED", { status: 200 });
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      return new NextResponse("Not Found", { status: 404 });
    }
  } catch (error) {
    console.error("Error parsing POST body:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Handles messaging_postbacks events
async function handleMessage(sender_psid, received_message) {
  let responseText = "";

  // Check if the message contains text
  if (received_message.text) {
    // Generate response using our existing knowledge base
    responseText = generateBotResponse(received_message.text);
    
    // Facebook Messenger requires standard text formatting (it doesn't support markdown fully like **bold**)
    // So we strip out the markdown characters for messenger
    responseText = responseText.replace(/\*\*/g, ""); 
    // Basic conversion of [link](url) to "link: url" for messenger
    responseText = responseText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1: $2");
  }

  // Create the payload for a basic text message
  const response = {
    "text": responseText
  };

  // Sends the response message
  await callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
async function callSendAPI(sender_psid, response) {
  // Construct the message body
  const requestBody = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  };

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      console.error("Unable to send message to Facebook Graph API");
      const errorData = await res.json();
      console.error(errorData);
    }
  } catch (error) {
    console.error("Failed to connect to Facebook Graph API", error);
  }
}
