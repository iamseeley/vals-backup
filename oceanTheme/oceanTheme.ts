export const oceanTheme = {
  fontLink: `<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">`,
  styles: `
    /* General styles */
    body {
      padding: 5px;
      line-height: 1.6;
      color: #052e16;
      text-align: left;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      background: linear-gradient(to top, #2e8b57, #87ceeb);
      overflow-x: hidden;
      position: relative;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    a:hover, a:focus {
      text-decoration: underline;
    }

    /* Header styles */
    header {
      margin-top: 8px;
      margin-bottom: 12px;
      text-align: left;
    }

    header .intro {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      margin-bottom: 8px;
    }

    header .intro h3 {
      padding: 6px;
      background-color: #16a34a;
      color: white;
      margin: 0;
    }

    .links {
      display: flex;
      flex-direction: row;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 2px;
    }

    /* Section styles */
    section {
      margin-bottom: 12px;
    }

    section h2 {
      border-bottom: 1px solid #052e16;
      padding-bottom: 5px;
      margin-bottom: 12px;
    }

    /* Highlights styles */
    .highlights {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .highlight-item {
      display: flex;
      align-items: flex-start;
    }
    
    .highlight-item::before {
      content: "•";
      color: #052e16;
      font-weight: bold;
      display: inline-block;
      width: 10px;
      margin-right: 4px;
    }

    /* Reduce margin for headings and paragraphs */
    h1, h2, h3, h4, h5, h6, p {
      margin: 0;
    }

    /* List Reset */
    ul {
      list-style: none;
      padding: 0;
    }

    li {
      margin-bottom: 10px;
    }

    aside {
      margin-top: 8px;
      margin-bottom: 8px;
      padding-top: 4px;
      padding-bottom: 4px;
      padding-left: 8px;
      border-left: 2px solid #16a34a;
      background-color: #86efac;
    }

    .tech-stack {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 2px;
    }

    .tech-stack p {
      padding-left: 4px;
      padding-right: 4px;
      border: solid 1px #052e16;
      margin: 0;
    }

    /* Title & Date Period styles */
    .title-period {
      display: flex;
      justify-content: space-between;
    }

    .date {
      font-style: italic;
      color: #14532d;
    }

    .company {
      font-weight: normal;
      font-style: italic;
    }

    /* Fish and bubble animations */
    .fish {
      position: absolute;
      right: -50px; /* Start outside the viewport */
      animation: swim linear infinite;
    }



    @keyframes swim {
      0% { transform: translateX(0) translateY(0); }
      25% { transform: translateX(-25vw) translateY(-10px); }
      50% { transform: translateX(-50vw) translateY(0); }
      75% { transform: translateX(-75vw) translateY(10px); }
      100% { transform: translateX(calc(-100vw - 50px)) translateY(0); } 
    }

    .bubble {
      position: absolute;
      bottom: -50px;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      animation: rise infinite;
      animation-timing-function: linear;
    }

    @keyframes rise {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-320vh);
      }
    }

    @keyframes sway {
      from { transform: rotate(0deg); }
      to { transform: rotate(2deg); }
    }

    #saveAsPDFButton {
      cursor: pointer;
      margin-top: 24px;
      font-weight: 500;
      background-color: #d4d4d4;
      color: #171717;
      padding: 4px;
    }

    #saveAsPDFButton:hover {
      background-color: #a3a3a3;
    }
  `
};
