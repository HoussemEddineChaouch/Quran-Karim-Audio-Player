const apiUrl = 'https://mp3quran.net/api/v3';
const language = 'ar';


async function getReciters() {
    const chooseReciters = document.querySelector('#chooseReciters');
    const res = await fetch(`${apiUrl}/reciters?language=${language}`);
    const data = await res.json();    
    chooseReciters.innerHTML = `<option value=''>إختر قارئ</option>`;
    data.reciters.forEach(reciter => {
        chooseReciters.innerHTML += `<option value='${reciter.id}'>${reciter.name}</option>`;
         
    });
   
    chooseReciters.addEventListener('change' , (e) => {getmoshaf(e.target.value);})
}
getReciters()
async function getmoshaf(idReciter) {
    const chooseMoshaf = document.querySelector('#chooseMoshaf');

    const res = await fetch(`${apiUrl}/reciters?language=${language}&reciter=${idReciter}`);
    const data = await res.json();
    const moshafs = data.reciters[0].moshaf;
    
    chooseMoshaf.innerHTML = `<option value='' data-server="" data-surahList="" >إختر مصحف</option>`;
    moshafs.forEach(moshaf => {
        chooseMoshaf.innerHTML += `<option value='${moshaf.id}' data-server="${moshaf.server}" data-surahList="${moshaf.surah_list}"'>${moshaf.name}</option>`;
    });
   chooseMoshaf.addEventListener('change' , (e) => {
    const selectedMoshaf = chooseMoshaf.options[chooseMoshaf.selectedIndex];
    const surahServer = selectedMoshaf.dataset.server;
    const surahlist = selectedMoshaf.dataset.surahlist;
    getSurah(surahServer , surahlist)
})


}
async function getSurah(surahServer , surahList) {
    const chooseSura = document.querySelector('#chooseSura');

    const res = await fetch(`https://mp3quran.net/api/v3/suwar`);
    const data = await res.json();
    const surahNames = data.suwar;
    
    surahList = surahList.split(",");
    chooseSura.innerHTML =`<option value=''>إختر سورة</option>`;
    surahList.forEach((surah) => {
        const padSurah = surah.padStart(3,'0')
        surahNames.forEach((surahName) => {
            if(surahName.id == surah) {
                chooseSura.innerHTML+=`<option value='${surahServer}${padSurah}.mp3'>${surahName.name}</option>`;
                 
            }
        })
    });
    chooseSura.addEventListener('change' , (e) => {
        const selectedSurah = chooseSura.options[chooseSura.selectedIndex];
       playSourah(selectedSurah.value);
    })
    
}
function playSourah(surahMp3) {
    const audioSurah = document.querySelector('#audioSurah');
    audioSurah.src = surahMp3 ;
    audioSurah.play();
}
