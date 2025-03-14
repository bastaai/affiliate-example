"use client";

import Script from "next/script";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { SquareTerminal } from "lucide-react";
import Link from "next/link";

interface ConsoleLine {
  message: string;
  color: string;
}

export default function Home() {
  const [eventName, setEventName] = useState("signup");
  const [consoleOutput, setConsoleOutput] = useState<ConsoleLine[]>([]);

  const handleEmit = async () => {
    if (eventName.trim()) {
      const timestamp = new Date().toLocaleTimeString();
      setConsoleOutput((prev) => [
        ...prev,
        {
          message: `[${timestamp}] Event emitted: "${eventName}"`,
          color: "text-green-400",
        },
      ]);

      const res = await basta.emit(eventName, null);
      if (res instanceof Error) {
        setConsoleOutput((prev) => [
          ...prev,
          {
            message: `[${timestamp}] Error: ${res.cause?.code} - ${res.message}`,
            color: "text-red-400",
          },
        ]);
      } else {
        setConsoleOutput((prev) => [
          ...prev,
          {
            message: `[${timestamp}] Server response: ${JSON.stringify(res)}`,
            color: "text-green-400",
          },
        ]);
      }

      // Keep focus on input after clicking the button
      document.getElementById("event-input")?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEmit();
    }
  };

  return (
    <>
      <Script
        src="https://pkg.basta.app/js/affiliate.js"
        strategy="beforeInteractive"
        basta-account-id={process.env.NEXT_PUBLIC_BASTA_ACCOUNT_ID}
        basta-cookie-consent="true"
        basta-debug
      />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Affiliate Example
          </h1>
          <ol className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>
              <p>
                Include the snippet below in your website&apos;s header to load
                the affiliate functionality:
              </p>
              <code className="bg-black/[.1] dark:bg-white/[.1] px-2 py-2 mx-2 my-2 rounded font-mono flex">
                &lt;script src=&quot;https://pkg.basta.app/js/affiliate.js&quot;
                basta-account-id=&quot;account-id&quot;
                basta-cookie-consent=&quot;true&quot;&gt;&lt;/script&gt;
              </code>
            </li>
            <li>
              <p>
                When you direct users to your site via an affiliate link, a
                referral cookie is automatically created to associate the user
                with the affiliate. For example:
              </p>
              <code className="bg-black/[.1] dark:bg-white/[.1] px-2 py-2 mx-2 my-2  rounded font-mono flex">
                <Link href="/?via=adam">https://example.com/?via=adam</Link>
              </code>
              <p>Or with UTM parameters:</p>
              <code className="bg-black/[.1] dark:bg-white/[.1] px-2 py-2 mx-2 my-2  rounded font-mono flex">
                <Link href="/?via=adam&utm_source=google&utm_campaign=black+friday+sale">
                  https://example.com/?via=adam&utm_campaign=black+friday+sale
                </Link>
              </code>
            </li>
            <li>
              <p>
                You can also track user interactions by sending events with
                custom data that will be linked to the appropriate affiliate.
                For instance:
              </p>
              <code className="bg-black/[.1] dark:bg-white/[.1] px-2 py-2 mx-2 my-2  rounded font-mono flex">
                basta.emit(&quot;signup&quot;, {`{`} &quot;hello&quot;:
                &quot;world&quot;{`}`})
              </code>
            </li>
          </ol>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Demo
          </h3>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  id="event-input"
                  placeholder="Enter event name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <Button onClick={handleEmit}>Emit</Button>
            </div>
          </div>

          <div className="border rounded-md bg-black  w-full">
            <div className="p-2 border-b bg-gray-900 text-white">
              <SquareTerminal />
            </div>
            <ScrollArea className="h-64 p-3 font-mono text-sm w-full text-green-400">
              {consoleOutput.length > 0 ? (
                consoleOutput.map((output, index) => (
                  <div key={index} className={`py-1 ${output.color}`}>
                    {output.message}
                  </div>
                ))
              ) : (
                <div className="py-1 text-gray-500">
                  No events emitted yet. Enter an event name and click
                  &quot;Emit&quot;.
                </div>
              )}
            </ScrollArea>
          </div>
        </main>
      </div>
    </>
  );
}
