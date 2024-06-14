import { resumeSetup } from 'https://esm.town/v/iamseeley/resumeSetup';
import { renderResume } from 'https://esm.town/v/iamseeley/renderResume';
import { starterTheme } from 'https://esm.town/v/iamseeley/starterTheme';
import { oceanTheme } from 'https://esm.town/v/iamseeley/oceanTheme';
import { customSkillsSection } from "https://esm.town/v/iamseeley/customSkillsSection";

export const resumeConfig = {
  // URL to fetch the resume JSON data. This should point to your raw resume JSON.
  // If you want to host your resume JSON somewhere I recommend a setup like this on val town (https://www.val.town/v/iamseeley/resumeDetails) or a github gist.
  // You can test out the resume view using my resume: https://iamseeley-resumedetails.web.val.run
  resumeJsonUrl: 'https://iamseeley-resumedetails.web.val.run',

  // Alternatively, you can provide the resume JSON directly here.
  // Example: { "basics": { "name": "John Doe" }, "work": [ ... ] }
  resumeJson: {},
  
  // Theme configuration for the resume. 
  // This includes a font link and styles for the resume.
  // You can customize the styles in the starterTheme or create a new one and import it.
  theme: starterTheme,
  
  // URL to a custom stylesheet if you want to add additional styles.
  customStyleUrl: '',
  
  // Order in which you want the sections to appear in the resume.
  // Full default order: ['header', 'summary', 'education', 'work', 'projects', 'volunteer', 'awards', 'certificates', 'publications', 'skills', 'languages', 'interests', 'references']
  // You can customize this array to change the order of sections.
  sectionOrder: ['header', 'summary', 'projects', 'education', 'work'],

  // Add custom sections here if you want to override any default sections. You can fork any of the default section vals.
  // When creating a custom section be mindful of the resume JSON schema.
  // Example:
  // customSections: {
  //     header: customHeader,
  //},
  customSections: {
    skills: customSkillsSection,
  },

  // Set this to true or false to show or hide the "Save as PDF" button.
  savePDFIsVisible: true
};