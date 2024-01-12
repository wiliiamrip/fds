const Status = true // true = on - false = off
const Activity = 'Playing' // choose one: Playing - Watching - Listening - Streaming
const Link = '' // whatevr link you want
const BigImage = '' // The Link To Big Image (Gif Is Cooler)
const BigImageText = "" // The Text Of The Big Image (Optional)
const SmallImage = "" // The Link To Small Image (Gif Is Cooler)
const SmallImageText = "" // The Text Of The Small Image (Optional)
const Name = "" // Name Of The Activity
const Details = "" // Details Of The Activity (Optional)
const Timer = true // true = on - false = off
const Buttons = [
  {
    name: 'Get One', // Name Of The Button
    url: 'https://replit.com/@WellYeah/discord-self-bot-voice-text-and-stream-fully-customizable' // Link Of The Button
  },
  {
    name: '', // Name Of The Button
    url: '' // Link Of The Button
  },
  // remove /* */ if you need a third button
  /*{ remove
      name: '', // Name Of The Button
      link: '' // Link Of The Button
  },*/
]
//// Don't Touch Unless You Know What You Are Doing! //////
const { RichPresence } = require('discord.js-selfbot-v13')
async function rpc(client) {
  try {
    if (Status == false) return
    let r = new RichPresence()
      .setApplicationId('817229550684471297')
      .setType(Activity.toUpperCase())
      .setURL(Link)
      .setName(Name)
      .setDetails(Details)
      .setAssetsLargeImage(BigImage)
      .setAssetsLargeText(BigImageText)
      .setAssetsSmallImage(SmallImage)
      .setAssetsSmallText(SmallImageText)
    if (Timer == true) {
      r.setStartTimestamp(Date.now())
    }
    Buttons.forEach(async (button) => {
      if (button.name == '' || !button.name) return
      if (button.url == '' || !button.url) return
      r.addButton(button.name, button.url)
    });
    client.user.setActivity(r);
  } catch (err) {
    console.log(err);
  }

}
module.exports = { rpc }
