import { resumeSetup } from 'https://esm.town/v/iamseeley/resumeSetup';
import { renderResume } from 'https://esm.town/v/iamseeley/renderResume';
import { helloResume } from 'https://esm.town/v/iamseeley/helloResume';
import { resumeConfig } from 'https://esm.town/v/iamseeley/resumeConfig';

export default async function resumeHandler(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    try {
      const config = await resumeSetup(resumeConfig);

      if (!config.resumeDetails || Object.keys(config.resumeDetails).length === 0) {
        const htmlMessage = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>hello, resume</title>
            <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='50%' font-size='24' text-anchor='middle' x='50%' dy='.3em'>📄</text></svg>">
            <style>
              ${helloResume}
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="typewriter">
                  <span id="helloResume"></span>
                </div>
                <div class="time" id="localTime"></div>
              </div>
              <div class="content">
                <p class="animate">Creating, customizing, and hosting resumes can get complicated and time-consuming. This project aims to simplify that process and maybe make it a little more enjoyable.</p>
                <p class="animate">We use <a href="https://jsonresume.org/schema" target="_blank">JSON Resume</a>, an open-source JSON-based standard, to make resume data more manageable and portable.</p>
                <p class="animate">Hello, resume is built on <a target="_blank" href="https://val.town">Val Town</a>, so you have full control to fork any of the "vals" (code modules) and extend the resume builder. You can create new themes, share them with others, and apply changes instantly without needing to publish any packages. Everything is managed within Val Town, making collaboration and customization seamless.</p>
              </div>
              <div class="callout-container animate">
              <div class="callout">
                <span class="emoji">🎉</span>
                <p>Say goodbye to boring LaTeX, and hello to HTML and CSS.</p>
              </div>
              </div>
              <div class="get-started animate">
                <p>To get started create a Val Town account and fork these vals:</p>
                <div class="vals">
                  <a class="val animate" href="https://www.val.town/v/iamseeley/resumeHandler" target="_blank"><span class="http-val">HTTP</span><p>resumeHandler</p></a>
                  <a class="val animate" href="https://www.val.town/v/iamseeley/resumeConfig" target="_blank"><span class="script-val">SCRIPT</span><p>resumeConfig</p></a>
                <div>
              </div>
            </div>
            <div class="attribution animate">
                <p>made with <span id="3d-emoji"></span> by <a href="https://tseeley.com" target="_blank">thomas</a></p>
            </div>
          <script type="module" src="https://esm.town/v/iamseeley/eventListeners"></script>
          </body>
          </html>
        `;
        return new Response(htmlMessage, { headers: { 'Content-Type': 'text/html' } });
      }

      const resumeHTML = renderResume(config);
      return new Response(resumeHTML, { headers: { 'Content-Type': 'text/html' } });
    } catch (error) {
      console.error("Error in handler:", error);
      return new Response(`Error: ${error.message}`, { status: 400 });
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
}
