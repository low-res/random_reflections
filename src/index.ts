import { FMT_yyyyMMdd_HHmmss } from "@thi.ng/date";
import { downloadCanvas, downloadWithMime } from "@thi.ng/dl-asset";
import { exposeGlobal } from "@thi.ng/expose";
import {
    asSvg,
    Group,
    group,
    polyline,
    rect,
    scale,
    svgDoc,
    warpPoints,
} from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";
import { pickRandom } from "@thi.ng/random";

// these declarations ensure TypeScript is aware of these
// externally defined vars/functions
declare var fxhash: string;
declare var isFxpreview: boolean;
declare function fxpreview(): void;

// flag to guard code blocks which are only wanted during development
// any `if (DEBUG) { ... }` code blocks will be removed in production builds
const DEBUG = process.env.NODE_ENV !== "production";

let timer: number;
let doUpdate = false;

const ATTRIBUTES: String[] = ["sustainable","the new black", "dead","overrated","acceptable","fulfilling","worth it","adaptable","a curse or a blessing","adventurous","ambitious","attractive","courageous","sincere","caring","charming","civilised","cooperative","compassionate","competitive","confident","considerate","steady","serene","courageous","courteous","creative","credible","cultured","daring","decent","profound","attentive to detail","determined","sacrificial","diligent","disciplined","elegant","sensitive","ethical","fashionable","fearless","free","funny","gracious","tenacious","grounded","practical","helpful","honest","modest","independent","inspiring","intelligent","interesting","likeable","loyal","mature","merciful","open-minded","optimistic","original","passionate","patient","pleasant","cultivated","popular","pragmatic","realistic","refined","relaxed","reliable","indestructible","resolute","respectful","considerate","reserved","secure","self-determined","selfless","sincere","competent","diligent","sensitive","tactful","talented","trustworthy","unaffected","unafraid","understanding","upright","virtuous","warm-hearted","well-known","well respected","well-mannered","witty"];
const NOUNS: String[] = ["Is labour","Is justice","Is god","Is gold","Is sleep","Is hair","Is Portugal","Is Australia","Is honey","Are potatoes","Is the Queen","Are bananas","Is rain","Is a rainbow","Is a beard","Is a refrigerator","Is Belgium","Are boys","Is breakfast","Is jewellery","Is Russia","Are candles","Are Sandwiches","Is a Car","Is school","Is education","Are Kangaroos","Is shampoo","Is China","Is the church","Are lawyers","Is sugar","Is leather","Is death","Is liberalism","Are teachers","Are smartphones","Are diamonds","Is television","Is London","Is art","Are Toothbrushs","Are Dreams","Is traffic","Is christmas","Is easter","Are Eggs","Is Manchester","Is Uganda","Is energy","Are monkeys","Is family","Is money","Is wealth","Is football","Is oil"];

let questionHolder: Element | null = null;

// main initialization function (called from further below)
const init = () => {
    // cancel any queued updates
    cancelAnimationFrame(timer);

    questionHolder = document.getElementsByClassName("question")[0];


    // trigger update with new settings
    update();

    // if needed also trigger fxpreview
    // doing this at this point might not fit every project, YMMV!
    isFxpreview && requestAnimationFrame(fxpreview);
};

/**
 * Main update/loop.
 *
 * YOU'LL PROBABLY WANT TO REPLACE MOST OF THIS WITH YOUR OWN CODE...
 * (if not, expect an invoice :)
 */
const update = () => {
    let tmpNoun = pickRandom(NOUNS);
    let tmpAttribute = pickRandom(ATTRIBUTES);
    if(questionHolder) questionHolder.innerHTML = `<h1>${tmpNoun} ${tmpAttribute} ?</h1>`;

    // loop unless user requested pause
    // (see keydown handler)
    doUpdate && (timer = requestAnimationFrame(update));
};



// re-initialize dynamic state when window is resized
window.onresize = init;

// kick off...
init();



// print out to console (will be removed for production build)
DEBUG && console.log(fxhash);