"use client";

import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script
        src="http://localhost:50000/js/affiliate.js"
        strategy="beforeInteractive"
        basta-account-id="account-id"
      />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1> Affiliate Example </h1>
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li>
              Add the following snippet to the header of your website:
              <div className="flex gap-4 items-center flex-col sm:flex-row">
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  &lt;script src=&quot;https://pkg.basta.app/affiliate.js&quot;
                  basta-account-id=&quot;account-id&quot; &gt;&lt;/script&gt;
                </code>
              </div>
            </li>
            <li className="mb-2">
              Send events:
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                basta.emit(&quot;signup&quot;, {`{`} &quot;hello&quot;:
                &quot;world&quot;{`}`})
              </code>
              <br></br>
              <br></br>
              <div className="flex gap-4 items-center flex-col sm:flex-row">
                <button
                  onClick={() => {
                    basta.emit("singup", { hello: "world" });
                  }}
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                >
                  Emit SignUp Event
                </button>
              </div>
            </li>
          </ol>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </>
  );
}
