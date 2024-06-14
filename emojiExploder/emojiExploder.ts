/** @jsxImportSource npm:hono@3/jsx */
import { codepoints } from "https://esm.town/v/jdan/codepoints";
import { emojiByCodepoints } from "https://esm.town/v/jdan/emojiByCodepoints";
import { nameOfCodepoint } from "https://esm.town/v/jdan/nameOfUnicode";
import { Hono } from "npm:hono";

const app = new Hono();

app.get("/", async (c) => {
  return c.html(
    <div>
      <h1>Emoji exploder</h1>
      <div>Enter an emoji and see what it's composed of</div>
      <form action="/emoji" method="get">
        <input type="text" name="emoji" /> <input type="submit" />
      </form>

      <div>Some cool examples</div>
      <ul>
        <li>
          😶‍🌫️ –{"  "}
          <a href="https://jdan-emojiexploder.web.val.run/emoji?emoji=%F0%9F%98%B6%E2%80%8D%F0%9F%8C%AB%EF%B8%8F">
            face in clouds
          </a>
        </li>
        <li>
          👩🏼‍🤝‍👨🏿 –{" "}
          <a href="https://jdan-emojiexploder.web.val.run/emoji?emoji=%F0%9F%91%A9%F0%9F%8F%BC%E2%80%8D%F0%9F%A4%9D%E2%80%8D%F0%9F%91%A8%F0%9F%8F%BF">
            Woman and Man Holding Hands: Light Skin Tone, Medium Skin Tone
          </a>
        </li>

        <li>
          🏴 –{" "}
          <a href="https://jdan-emojiexploder.web.val.run/emoji?emoji=%F0%9F%8F%B4%F3%A0%81%A7%F3%A0%81%A2%F3%A0%81%B7%F3%A0%81%AC%F3%A0%81%B3%F3%A0%81%BF">
            flag: Wales
          </a>
        </li>

        <li>
          👩🏻‍❤️‍💋‍👩🏽 –{" "}
          <a href="https://jdan-emojiexploder.web.val.run/emoji?emoji=%F0%9F%91%A9%F0%9F%8F%BB%E2%80%8D%E2%9D%A4%EF%B8%8F%E2%80%8D%F0%9F%92%8B%E2%80%8D%F0%9F%91%A9%F0%9F%8F%BD">
            Kiss: Woman, Light Skin Tone, Woman, Medium Skin Tone
          </a>
        </li>
        <li>
          ↔️ –{" "}
          <a href="https://jdan-emojiexploder.web.val.run/emoji?emoji=%E2%86%94%EF%B8%8F">
            left-right arrow
          </a>
        </li>
        <li>
          🇵🇸 –{" "}
          <a href="https://jdan-emojiexploder.web.val.run/emoji?emoji=%F0%9F%87%B5%F0%9F%87%B8">
            flag: Palestinian Territories
          </a>
        </li>
      </ul>

      <a href="https://www.val.town/v/jdan/emojiExploder">Fork on Val Town</a>
    </div>,
  );
});

app.get("/emoji", async (c) => {
  const emoji = c.req.query("emoji");
  const emojiCodepoints = codepoints(emoji);
  const byCodepoints = await emojiByCodepoints;

  return c.html(
    <div>
      <form action="/emoji" method="get">
        <input type="text" name="emoji" /> <input type="submit" />
      </form>

      <h1 id="emoji" data-emoji={emoji}>{emoji}</h1>
      <div id="3d-emoji-container"></div>
      <div>
        Description: <strong>{byCodepoints[emojiCodepoints.join("-")]?.description}</strong>
      </div>
      <div>
        Codepoints: <strong>{emojiCodepoints.length}</strong>
      </div>
      <div>{codepoints(emoji).join("-")}</div>
      <ol>
        {emojiCodepoints.map((cp) => (
          <li>
            {cp} {String.fromCodePoint(parseInt(cp, 16))} {nameOfCodepoint(cp)}
          </li>
        ))}
      </ol>

      <a href="https://www.val.town/v/jdan/emojiExploder">Fork on Val Town</a>

     <script type="module" src="https://esm.town/v/iamseeley/threejsEmoji"></script>
    </div>,
  );
});

export default app.fetch;
