import { Injectable } from '@angular/core';
import {
  mergeAndAddnewAttribute,
  mergeAttributeen,
  mergeAttributevi,
} from '../tools/MeansHandle';
import { getType } from 'src/tools/POSHandle';
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
}
