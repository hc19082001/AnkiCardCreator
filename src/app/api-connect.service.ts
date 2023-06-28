import { Injectable } from '@angular/core';
import {
  mergeAndAddnewAttribute,
  mergeAttributeen,
  mergeAttributevi,
} from '../tools/MeansHandle';
import { getType, getTypeReverse } from 'src/tools/POSHandle';
@Injectable({
  providedIn: 'root',
})
export class ApiConnectService {
  // ~ VIETNAMESE MEANINGS
  async getMeanOfWordVNeseLaban(word: string) {
    return fetch(`https://dict.laban.vn/find?type=1&query=${word}`)
      .then((response) => response.text())
      .then((response) => {
        let word: any = { ipa: '', defs: [] };
        const laban_container = document.querySelector('.container');
        laban_container!.innerHTML = response;
        laban_container!
          .querySelectorAll('script')
          .forEach((item) => item.remove());
        laban_container!
          .querySelectorAll('link')
          .forEach((item) => item.remove());
        word.ipa = laban_container!.querySelector('.color-black')
          ? laban_container!.querySelector('.color-black')!.textContent
          : '';
        laban_container!
          .querySelectorAll(
            '.slide_content:not(.hidden) .bg-grey.bold.font-large.m-top20'
          )
          .forEach((item) => {
            let defObj: { type: number; vi: string[] } = { type: 0, vi: [] };
            let defArr: string[] = [];
            defObj.type = getType(item.textContent!);
            let current = item.nextElementSibling;
            while (!current!.className) {
              current = current!.nextElementSibling;
            }
            while (current!.className != 'bg-grey bold font-large m-top20') {
              if (current!.className == 'green bold margin25 m-top15') {
                defArr.push(current!.textContent!);
              }
              if (
                current!.nextElementSibling &&
                current!.nextElementSibling.className !=
                  'bg-grey bold font-large m-top20'
              ) {
                current = current!.nextElementSibling;
              } else {
                defObj.vi = defArr;
                word.defs.push(defObj);
                break;
              }
            }
          });
        const newDefsMerged = mergeAttributevi(word.defs);
        return { ...word, defs: newDefsMerged };
      });
  }
  async getMeanOfWordVNeseSoha(word: string) {
    const result = await fetch(`http://tratu.soha.vn/dict/en_vn/${word}`);
    const data = await result.text();
    const soha_container = document.getElementById('soha');
    soha_container!.innerHTML = data;
    soha_container!.querySelectorAll('script').forEach((item) => item.remove());
    soha_container!.querySelectorAll('link').forEach((item) => item.remove());
    const frame = soha_container!.querySelector(
      '.main-content #content-main #bodyContent'
    );
    let ovr: any = { ipa: '', defs: [] };
    ovr.ipa = frame!.querySelector('#bodyContent > #content-5')
      ? frame!.querySelector('#bodyContent > #content-5')!.textContent
      : null; //IPA
    const formBlocks = frame!.querySelectorAll('#show-alter #content-3')[0]
      ? frame!.querySelectorAll('#show-alter #content-3')
      : frame!.querySelectorAll('#show-alter #content-5');
    const forms: any[] = [];
    formBlocks.forEach((item) => {
      const form = item.querySelector('h3')
        ? item.querySelector('h3')!.textContent
        : item.querySelector('h5')!.textContent;
      let obj2: any[] = [];
      if (
        form?.trim().toLocaleLowerCase() !== 'hình thái từ' &&
        form?.trim().toLocaleLowerCase() !== 'cấu trúc từ' &&
        form?.trim().toLocaleLowerCase() !== 'hìmh thái từ'
      ) {
        const obj: any = { type: 0, vi: [] };
        obj.type = getType(form!); // TYPE
        if (form?.trim().toLocaleLowerCase().includes('&')) {
          const arr = form?.split(' & ');
          arr?.forEach((item) => {
            if (getType(item) !== obj.type) {
              obj2.push(getType(item));
            }
          });
        }
        item.querySelectorAll('#content-5').forEach((mean: any) => {
          const meanText = mean.querySelector('h5')?.textContent; // MEANS
          if (obj2.length > 0) {
            obj2.forEach((item) => {
              forms.push({ type: item, vi: [meanText] });
            });
          }
          if (obj.type === 2) {
            if (form?.trim().toLocaleLowerCase().includes('ngoại động từ')) {
              obj.vi.push('[V.t]' + meanText);
              return;
            } else if (
              form?.trim().toLocaleLowerCase().includes('nội động từ')
            ) {
              obj.vi.push('[V.i]' + meanText);
              return;
            }
          }
          obj.vi.push(meanText);
        });
        forms.push(obj);
      }
    });
    ovr.defs = forms;
    const newDefsMerged = mergeAttributevi(ovr.defs);
    return { defs: newDefsMerged };
  }
  async getMeanOfWordVNese(word: string) {
    const [soha, laban] = await Promise.all([
      this.getMeanOfWordVNeseSoha(word),
      this.getMeanOfWordVNeseLaban(word),
    ]);
    console.log([...laban.defs, ...soha.defs]);
    const merge = {
      ipa: laban.ipa,
      defs: mergeAttributevi([...laban.defs, ...soha.defs]),
    };
    return merge;
  }

  // ~ ENGLISH MEANINGS
  async getMeanOfEngWordCambridge(word: string) {
    const firstData = await fetch(
      `https://dictionary.cambridge.org/vi/dictionary/english/${word}`
    );
    const textData = await firstData.text();
    const cambridge_container = document.querySelector('#cambride-word');
    cambridge_container!.innerHTML = textData;
    const a = cambridge_container!.querySelector('#page-content');
    if (a) {
      const tab = a.querySelectorAll('.page .pr.dictionary')[0];
      const pos_def_s = tab.querySelectorAll('.entry-body .pr.entry-body__el');
      let arrWord: any = [];
      pos_def_s.forEach((pos_def: any) => {
        const def_s: any = [];
        const pos = pos_def.querySelector(
          '.pos-header.dpos-h .posgram.dpos-g.hdib.lmr-5 .pos.dpos'
        ).innerText;
        const def_htmls = pos_def.querySelectorAll(
          '.pos-body .pr.dsense .sense-body.dsense_b .def-block.ddef_block'
        );
        def_htmls.forEach((def_html: any) => {
          const def = def_html.querySelector(
            '.ddef_h .def.ddef_d.db'
          ).innerText;
          const final_def = def.replace(':', '');
          def_s.push(final_def);
        });
        arrWord.push({ type: getType(pos), en: def_s });
      });
      return arrWord;
    } else {
      return [];
    }
  }

  // ~ VN & EN MEANINGS
  async getMeanOfWord(word: string) {
    const [eng_mean, vi_mean] = await Promise.all([
      this.getMeanOfEngWordCambridge(word),
      this.getMeanOfWordVNese(word),
    ]);
    let eng_obj: any = {};
    if (eng_mean.length > 0) {
      eng_obj.defs = mergeAttributeen(eng_mean);
    } else {
      eng_obj = { defs: [] };
    }
    const merge_en_vn = {
      ipa: vi_mean.ipa,
      defs: mergeAndAddnewAttribute(eng_obj.defs, vi_mean.defs),
    };
    console.log(mergeAndAddnewAttribute(eng_obj.defs, vi_mean.defs));
    return merge_en_vn;
  }

  //~ SYNONYMS
  // ! SOHA -> DEPRECATED
  async getSynonym(word: string) {
    let arrSynonyms: any = [];
    const fData = await fetch(
      `https://dict.laban.vn/find?type=1&query=${word}`
    );
    const textData = await fData.text();
    const laban_container = document.querySelector('.laban-synonym');
    laban_container!.innerHTML = textData;
    laban_container!
      .querySelectorAll('script')
      .forEach((item) => item.remove());
    laban_container!.querySelectorAll('link').forEach((item) => item.remove());
    const a = laban_container!.querySelector(
      '#content_selectable.slide-content .slide_img li:last-child #content_selectable.content'
    );
    if (a) {
      const synonyms = a.querySelectorAll('.color-light-blue.margin25.m-top15');
      synonyms.forEach((item: any) => {
        item.innerText.trim().length <= 15 &&
          arrSynonyms.push(item.innerText.trim());
      });
      return arrSynonyms;
    } else {
      return [];
    }
  }
  // !LACVIET
  async getSynonymLacViet(word: string) {
    const finalSynonyms: any = [];
    const fData = await fetch(
      `http://tratu.coviet.vn/hoc-tieng-anh/tu-dien/lac-viet/THESAURUS/${word}.html`
    );
    const textData = await fData.text();
    const lacviet_synonyms = document.querySelector('#lacviet-synonym');
    lacviet_synonyms!.innerHTML = textData;
    lacviet_synonyms!
      .querySelectorAll('script')
      .forEach((item) => item.remove());
    lacviet_synonyms!.querySelectorAll('link').forEach((item) => item.remove());

    const a = lacviet_synonyms!.querySelectorAll(
      'div[style="PADDING-BOTTOM: 4.75pt"]'
    );
    if (a.length > 0) {
      a.forEach((item) => {
        const text = item.querySelector('span')!.innerText.trim();
        finalSynonyms.push(text.trim());
      });
      const finalSynonyms2 = finalSynonyms
        .join(', ')
        .split(', ')
        .map((item: any) => item.replace('\n', ''));
      const finalSynonyms3: string[] = [];
      finalSynonyms2.forEach((item: any) => {
        finalSynonyms3.includes(item) || finalSynonyms3.push(item);
      });
      return finalSynonyms3;
    } else {
      return [];
    }
  }

  //~ WORD-FAMILY
  // async getWordFamily(word: string) {
  //   const firstData = await fetch(
  //     `https://dictionary.cambridge.org/vi/dictionary/english/${word}`
  //   );
  //   const textData = await firstData.text();
  //   const cambridge_container = document.querySelector('#cambride');
  //   cambridge_container!.innerHTML = textData;
  //   const a = cambridge_container!.querySelector(
  //     '#page-content.hfl-s.lt2b.lmt-10.lmb-25.lp-s_r-20.x.han.tc-bd.lmt-20.english'
  //   );
  //   const b = a!.querySelector('#ad_btmslot');
  //   const c = b!.previousElementSibling;
  //   const d = c!.querySelector('.hax.lp-10.lb.lb-cm.lbt0.dbrowse');
  //   const finalDataHTML = d!.querySelectorAll('.lmb-12');
  //   const finalData: any = [];
  //   const listPosOfWord: any = [];
  //   finalDataHTML.forEach((item: any) => {
  //     if (item.innerText.trim() !== word) {
  //       finalData.push(item.innerText.trim());
  //       const dataOfThisWord = this.getMeanOfWordVNese(item.innerText.trim());
  //       listPosOfWord.push(dataOfThisWord);
  //     }
  //   });
  //   return Promise.all(listPosOfWord).then((res) => {
  //     const result: any = [];
  //     res.forEach((item, index) => {
  //       if (item.defs.length > 0) {
  //         result.push(
  //           finalData[index] +
  //             ` (${getTypeReverse(item.defs[0].type)})  ${item.defs[0].vi}`
  //         );
  //       }
  //     });
  //     return result;
  //   });
  // }
  async getWordFamily(word: string) {
    const firstData = await fetch(`http://localhost:3000/wordFamily/${word}`);
    const finalData: any = [];
    const listPosOfWord: any = [];
    const data = await firstData.json();
    data.forEach((item: any) => {
      if (item.trim() !== word) {
        finalData.push(item.trim());
        const dataOfThisWord = this.getMeanOfWordVNese(item.trim());
        listPosOfWord.push(dataOfThisWord);
      }
    });
    return Promise.all(listPosOfWord).then((res) => {
      const result: any = [];
      res.forEach((item, index) => {
        if (item.defs.length > 0) {
          result.push(
            finalData[index] +
              ` (${getTypeReverse(item.defs[0].type)})  ${item.defs[0].vi}`
          );
        }
      });
      return result;
    });
  }

  //~ IMAGES API
  //https://www.google.com.vn/search?q=game%20hay%20vl&tbm=isch&hl=vi&tbs&sa=X&ved=0CAEQpwVqFwoTCKjC5OS-0f8CFQAAAAAdAAAAABAD&biw=1303&bih=681
  // https://www.google.com.vn/search?q=game%20hay%20vl&tbm=isch&hl=vi&tbs=itp:clipart&sa=X&ved=0CAIQpwVqFwoTCKDBh-O-0f8CFQAAAAAdAAAAABAD&biw=1303&bih=681
  // https://www.google.com.vn/search?q=game%20hay%20vl&tbm=isch&hl=vi&tbs=itp:animated&sa=X&ved=0CAQQpwVqFwoTCJDM4py_0f8CFQAAAAAdAAAAABAD&biw=1303&bih=681

  async getImage(word: string, type = 1) {
    // type: 1 -> all, 2 -> clipath, 3 -> animated
    const firstData = await fetch(
      `https://www.google.com.vn/search?q=${word}&tbm=isch&${
        type === 1 ? 'tbs' : type === 2 ? 'tbs=itp:clipart' : 'tbs=itp:animated'
      }&hl=vi&sa=X&ved=0CAQQpwVqFwoTCMD-prCLz_8CFQAAAAAdAAAAABAa&biw=1303&bih=681`
    );
    const textData = await firstData.text();
    const msbing = document.querySelector('#mc-imgs');
    msbing!.innerHTML = textData;
    const a: any = msbing!.querySelectorAll('script[nonce]');
    let z = '';
    for (let i = 0; i < a.length; i++) {
      if (a[i].innerText.startsWith('AF_initDataCallback')) {
        z = a[i].innerText;
      }
    }
    let matches;
    const regex = /https:\/\/[a-zA-Z0-9-_./]+/;
    const allMatches = [];
    let check = true;
    while (check) {
      matches = regex.exec(z);
      if (matches) {
        allMatches.push(matches[0]);
        z = z.replace(matches[0], '');
      } else {
        check = false;
      }
    }
    const finalImages = allMatches.filter(
      (item) => item !== 'https://encrypted-tbn0.gstatic.com/images'
    );
    return finalImages;
  }

  //~ SOUND
  async getSound(word: string) {
    const exs = await fetch(
      `https://dict.laban.vn/ajax/getsound?accent=us&word=${word}`
    );
    const data = await exs.json();
    if (data.data !== '') {
      return data.data;
    } else {
      return `http://tratu.coviet.vn/sounds/en/${word[0]}/${word}.mp3`;
    }
  }
}
