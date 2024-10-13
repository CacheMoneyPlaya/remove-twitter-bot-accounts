(async function removeFollowers() {
  function processUsername(username) {
    if (username.startsWith("@")) {
      username = username.slice(1);
    }
    const match = username.match(/(\D+)(\d*)$/);
    if (match) {
      const namePart = match[1];
      const numberPart = match[2];
      if (numberPart && parseInt(numberPart) > 1000) {
        console.log(`Removing follower: ${namePart} ${numberPart}`);
        return true;
      }
    }
    console.log(`Keeping follower: ${username}`);
    return false;
  }
 
  async function startRemovingFollowers() {
    let i = 1;
    let totalRemoved = 0;
    let processed = true;
 
    while (processed) {
      processed = false;
      while (true) {
        try {
          const usernameSelector = `#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1c4cdxw.r-1t251xo.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(${i}) > div > div > button > div > div.css-175oi2r.r-1iusvr4.r-16y2uox > div > div.css-175oi2r.r-1wbh5a2.r-dnmrzs.r-1ny4l3l > div > div.css-175oi2r.r-1awozwy.r-18u37iz.r-1wbh5a2 > div.css-175oi2r.r-1wbh5a2.r-dnmrzs > a > div > div > span`;
          const usernameElement = document.querySelector(usernameSelector);
 
          if (!usernameElement) {
            console.log(`Finished current batch. Total removed so far: ${totalRemoved}`);
            break;
          }
 
          const username = usernameElement.innerText;
          const shouldRemove = processUsername(username);
 
          if (!shouldRemove) {
            i++;
            continue;
          }
 
          const followerMenuButtonSelector = `#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1c4cdxw.r-1t251xo.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(${i}) > div > div > button > div > div.css-175oi2r.r-1iusvr4.r-16y2uox > div > div.css-175oi2r.r-18u37iz > div.css-175oi2r.r-18u37iz.r-1h0z5md.r-11yx9uu > button`;
          const followerMenuButton = document.querySelector(followerMenuButtonSelector);
          if (!followerMenuButton) {
            console.log(`No more followers to process. Total removed: ${totalRemoved}`);
            break;
          }
 
          followerMenuButton.click();
          await new Promise(resolve => setTimeout(resolve, 1000));
 
          const removeFollowerButtonSelector = `#layers > div.css-175oi2r.r-zchlnj.r-1d2f490.r-u8s1d.r-ipm5af.r-1p0dtai.r-105ug2t > div > div > div > div.css-175oi2r.r-1ny4l3l > div > div.css-175oi2r.r-1aafeht.r-kemksi.r-1q9bdsx.r-qo02w8.r-1udh08x.r-u8s1d > div > div > div > div:nth-child(3)`;
          const removeFollowerButton = document.querySelector(removeFollowerButtonSelector);
 
          if (removeFollowerButton) {
            removeFollowerButton.click();
          } else {
            console.error(`Failed to click "Remove this follower" button for follower ${i}`);
            break;
          }
 
          await new Promise(resolve => setTimeout(resolve, 1000));
 
          const confirmRemoveButtonSelector = `#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-1kihuf0.r-q78sty.r-1awozwy.r-1pjcn9w.r-9dcw1g > div.css-175oi2r.r-kemksi.r-pm9dpa.r-1rnoaur.r-1867qdf.r-z6ln5t.r-1q0zpk3.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div.css-175oi2r.r-eqz5dr.r-1fraz6h.r-10sn7jt.r-1d7gupr.r-13qz1uu > button:nth-child(1)`;
          const confirmRemoveButton = document.querySelector(confirmRemoveButtonSelector);
 
          if (confirmRemoveButton) {
            confirmRemoveButton.click();
            console.log(`Removed follower ${username}`);
            totalRemoved++;
            processed = true;
          } else {
            console.error(`Failed to confirm removal for follower ${i}`);
            break;
          }
 
          await new Promise(resolve => setTimeout(resolve, 1000));
          i++;
        } catch (error) {
          console.error(`Error processing follower ${i}:`, error);
          break;
        }
      }
 
      if (processed) {
        window.scrollTo(0, document.body.scrollHeight);
        console.log("Scrolling down to load more followers...");
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        break;
      }
    }
 
    console.log(`Process complete. Total followers removed: ${totalRemoved}`);
  }
 
  await startRemovingFollowers();
})();
 
