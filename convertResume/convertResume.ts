

export default async function convertResume(req: Request): Promise<Response> {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume to JSON</title>
        <style>
        body {
          padding: 5px;
          margin-top: 32px;
          background-color: #2c3e50;
          font-family: 'Arial', sans-serif;
          color: #ecf0f1;
          max-width: 624px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        
         
        /* Spinner Styles */
        .spinner {
            display: none;
            border: 8px solid #f3f3f3;
            border-radius: 50%;
            border-top: 8px solid #3498db;
            width: 60px;
            height: 60px;
            animation: spin 2s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Copy Button Styles */
        #copyButton {
            display: none;
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #hostButton {
            display: none;
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #2ecc71;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        /* API Key Input Styles */
        #apiKeyInput {
            display: none;
            margin-top: 10px;
        }

        pre {
          white-space: preserve;
        }
        
    </style>
    </head>
    <body>
        <h1>Convert Resume to JSON Resume Standard</h1>
        <form id="resumeForm">
            <textarea id="resumeContent" rows="20"  placeholder="Paste your resume content here..."></textarea><br>
            <button type="submit">Convert to JSON</button>
        </form>
        <h2>JSON Resume Output</h2>
        <div class="spinner" id="spinner"></div>
        <pre id="jsonOutput"></pre>
        <button id="copyButton">Copy to Clipboard</button>
        <input type="text" id="apiKeyInput" placeholder="Enter your Val Town API Key">
        <button id="hostButton">Host Resume</button>
        
    
        <script type="module">
            import { convertToResumeJSON } from 'https://esm.town/v/iamseeley/convertToResumeJSON';
            import { copyToClip } from 'https://esm.town/v/iamseeley/copyToClip';
            import { hostResume } from 'https://esm.town/v/iamseeley/hostResume';
    
            document.getElementById('resumeForm').addEventListener('submit', async function(event) {
              event.preventDefault();
              const resumeContent = document.getElementById('resumeContent').value;
              const apiKey = '${Deno.env.get("OPENAI_API_KEY")}';
              const spinner = document.getElementById('spinner');
              const jsonOutput = document.getElementById('jsonOutput');
              const copyButton = document.getElementById('copyButton');
              const hostButton = document.getElementById('hostButton');
              const apiKeyInput = document.getElementById('apiKeyInput');

              spinner.style.display = 'block';
              jsonOutput.textContent = '';
              copyButton.style.display = 'none';
              hostButton.style.display = 'none';
              apiKeyInput.style.display = 'none';
    
             try {
                const jsonResume = await convertToResumeJSON(resumeContent, apiKey);
                jsonOutput.textContent = JSON.stringify(JSON.parse(jsonResume), null, 2);
                copyButton.style.display = 'block';
                hostButton.style.display = 'block';
                apiKeyInput.style.display = 'block';
            } catch (error) {
                jsonOutput.textContent = 'An error occurred while converting the resume.';
            } finally {
                // Hide the spinner
                spinner.style.display = 'none';
            }
          });
            
            document.getElementById('copyButton').addEventListener('click', () => copyToClip('jsonOutput'));

            document.getElementById('hostButton').addEventListener('click', async function() {
              const jsonOutput = document.querySelector('#jsonOutput').innerText;
              const valTownApiKey = document.getElementById('apiKeyInput').value; // Get the Val Town API key from input
  
              if (!valTownApiKey) {
                  alert('Please enter your Val Town API Key.');
                  return;
              }
  
              try {
                  const hostedUrl = await hostResume(JSON.parse(jsonOutput), valTownApiKey);
                  alert('Resume hosted at: ' + hostedUrl);
                  window.open(hostedUrl, '_blank');
              } catch (error) {
                  alert('An error occurred while hosting the resume.');
              }
        });
        </script>
    </body>
    </html>
`;
  return new Response(html, { headers: { "Content-Type": "text/html" } });
}