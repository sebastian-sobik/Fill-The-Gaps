const teksty = ["Nie poddawaj się, myślę o Tobie, Kruszynko ❤", "Ci tengo molto a te, Tesoro ❤", "Mi piaci, Tesoro 😏", 
                "Dobrze, że Cię mam ❣", "Daj popalić tym wiedźmom 🧙‍♀️", "No cześć, Ślicznotko ☕☀", "Ti amo, sai? ❤",
                "Miłego dziooonka ☀🌹", "Mi manchi 😥"];

function losujTekst(teksty) {
    return teksty[Math.floor(Math.random()*teksty.length)];
}

function podmienTekst() {
    const h2 = document.querySelector("h2");
    h2.innerText = losujTekst(teksty);
}

podmienTekst();


const btn_wczytaj = document.querySelector("#btn-wczytaj");
let tekst_;
let it_begin = 0, it_end = 4;
btn_wczytaj.addEventListener("click", _wczytanie) 

function znajdzLuki2(tekst) {

    // let wektorWartości = [];
    let luka_poczatek = tekst.indexOf("_");
    const input_partOne = "<input type='text' class='ramka' index='" ;
    let index = 0;

    while (luka_poczatek != -1) {
        let luka_koniec = luka_poczatek
        for (; tekst[luka_koniec + 1] == "_"; luka_koniec++);

        //Rozdzielenie zdania na część przed ___ i po
        const pierwszaCzesc = tekst.slice(0, luka_poczatek);
        const drugaCzesc = tekst.slice(luka_koniec + 1);

        //Dodanie input z index(html)
        tekst = `${pierwszaCzesc}${input_partOne}${index++}'>${drugaCzesc}`;

        //Wektor wartości wypełniany pustymi łańcuchami
        // wektorWartości.push(" ");

        //Szukanie indexu kolejnej luki
        luka_poczatek = tekst.indexOf("_", luka_koniec + 1);
    }

    return tekst;

// return wektorWartości;
}

function _wczytanie() {
    const textarea = document.querySelector("textarea"); 
    tekst_ = znajdzLuki2(textarea.value);

    textarea.remove();
    btn_wczytaj.remove();
    const input_area = document.querySelector(".input-area");
    input_area.append(wczytanyDIV(tekst_));
    input_area.append(btn_generateWORD());

}

function wczytanyDIV(tekst) {
    let div = document.createElement("div");
    div.classList.add("wczytane");
    div.innerHTML = tekst;

    return div;
}

function btn_generateWORD() {   
    let btn = document.createElement("button");
    btn.setAttribute("id","btn-wczytaj");
    btn.innerText = "wygeneruj";
    btn.addEventListener("click", generujWORD);

    return btn;
}

function generujWORD() {

    const input_area = document.querySelector(".wczytane");
    const inputVector = input_area.children;
    let input_area_text = input_area.innerHTML;
    let tekstZwracany="";

    let luka_poczatek = input_area_text.indexOf("<");
    let luka_koniec = 0;
    let index = 0;

    while (luka_poczatek != -1) {
        let wartoscInput = inputVector[index++].value;

        //Rozdzielenie zdania na część przed < i po >
        const pierwszaCzesc = input_area_text.slice(luka_koniec, luka_poczatek);

        //Dodanie input z index(html)
        if(wartoscInput == "")
            wartoscInput = "_____";
        tekstZwracany += `${pierwszaCzesc}<b><u>${wartoscInput}</u></b`;

        //Szukanie indexu kolejnej luki
        luka_koniec = input_area_text.indexOf(">", luka_poczatek);
        luka_poczatek = input_area_text.indexOf("<", luka_koniec + 1);
    }
    tekstZwracany += ">";

    Export2Word(tekstZwracany, 'tekst');


}

function Export2Word(tekst = " ", filename = 'tekst') {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + tekst + postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}

setTimeout(()=>{
    document.querySelector(".shortcuts").addEventListener("transitionend", ()=>{
        document.querySelector(".shortcuts").remove();
    })
    document.querySelector(".shortcuts").classList.add("opacity-0");
},15000);









// function zdanie() {
//     this.tresc = " ";
//     this.wektorLuk = [];
// }

// function findIndexOf_3things(obecneZdanie, poczatek) {
    
//     let wCudzyslowie = false, wNawiasie = false;
//     let ile = 0;
//     for (let i = poczatek; i < obecneZdanie.length; i++) {
        
//         if((obecneZdanie.codePointAt(i) == 8220 + ile) && !wNawiasie)
//         {
//             wCudzyslowie = !wCudzyslowie;
//             ile++;
//         }
//         if(wCudzyslowie) {continue;}

//         if(obecneZdanie[i] == "(")
//         {
//             wNawiasie = true;
//         }

//         if(wNawiasie)
//         {
//             if(obecneZdanie[i] == ")")
//                 wNawiasie = false;
//             continue;
//         }

//         if (obecneZdanie[i] == '.')
//             return i;
//         else if (obecneZdanie[i] == '!')
//             return i;
//         else if (obecneZdanie[i] == '?')
//             return i;
//     }
//     return -1;
// }

// function podzielNaZdania(tekst) {

//     let zdania = [{tresc: " ", wektorLuk: []}];

//     let index1 = 0;
//     let index2 = findIndexOf_3things(tekst, 1);

//     while (index2 != -1) {
//         let obecneZdanie = new zdanie;
//         obecneZdanie.tresc = tekst.substr(index1, index2 - index1 + 1);

//         obecneZdanie.wektorLuk = znajdzLuki(obecneZdanie);
//         zdania.push(obecneZdanie);

//         index1 = index2 + 2;
//         index2 = findIndexOf_3things(tekst, index1);
//     }

//     zdania.push({tresc: " ", wektorLuk: []});

//     return zdania;

// }

// function znajdzLuki(obecneZdanie) {

//     let wektorWartości = [];
//     let luka_poczatek = obecneZdanie.tresc.indexOf("_");
//     const input_partOne = "<input type='text' index='" ;
//     let index = 0;

//     while (luka_poczatek != -1) {
//         let luka_koniec = luka_poczatek
//         for (; obecneZdanie.tresc[luka_koniec + 1] == "_"; luka_koniec++);

//         //Rozdzielenie zdania na część przed ___ i po
//         const pierwszaCzesc = obecneZdanie.tresc.slice(0, luka_poczatek);
//         const drugaCzesc = obecneZdanie.tresc.slice(luka_koniec + 1);

//         //Dodanie input z index(html)
//         obecneZdanie.tresc = `${pierwszaCzesc}${input_partOne}${index++}'>${drugaCzesc}`;

//         //Wektor wartości wypełniany pustymi łańcuchami
//         wektorWartości.push(" ");

//         //Szukanie indexu kolejnej luki
//         luka_poczatek = obecneZdanie.tresc.indexOf("_", luka_koniec + 1);
//     }

// return wektorWartości;
// }






// function zapiszDane(blok, it) {

//     console.log(zdania, " ", zdania[it_begin], " ", zdania[it_begin].wektorLuk);

//     for(let i = 0; i < zdania[it].wektorLuk.length; i++)
//     {
//         if(zdania[it].wektorLuk[i] != blok.children[i].value)
//             zdania[it].wektorLuk[i] = blok.children[i].value;
//     }
    
// }

// function wczytajDane(blok, it) {
//     for(let i = 0; i < blok.children.length; i++)
//     {
//         blok.children[i].value = zdania[it].wektorLuk[i];
//     }
// }





//------------------------------------------------------------

    function randomColor() { return "#" + Math.floor(Math.random()*16777215).toString(16); }   

    // function generateDIV(direction) {
    //     let div = document.createElement("div");
    //     div.classList.add("block-hidden", "height0", "block");
        
    //     if(direction){
    //         div.innerHTML = zdania[it_end].tresc;
    //         div.setAttribute('data-before', it_end + ". "); 
    //         wczytajDane(div, it_end);
    //     }
    //     else {
    //         div.innerHTML = zdania[it_begin].tresc;
    //         div.setAttribute('data-before', it_begin + ". ");
    //         wczytajDane(div, it_begin);
    //     }

    //     return div;
    // }

    // let isScrolling = false;
    // let lista;

    // function up(first, second, last, toggle) {
    //     first.classList.toggle("height0");
    //     second.classList.toggle("block-hidden");
        
    //     first.addEventListener("transitionend", ()=>{
    //         first.remove();
    //     }, {once:true});
    //     console.log(first);
        
    //     last.classList.toggle("block-hidden");

    //     if(toggle == "up") {
    //         if((it_end + 1) < zdania.length)
    //         {
    //             zapiszDane(first, it_begin);
    //             it_begin++; it_end++;
    //             lista.append(generateDIV(1));
    //             setTimeout(()=>{
    //                 lista.lastElementChild.classList.toggle("height0");
    //             },30);
    //         }
    //     }
    //     else {
    //         if((it_begin - 1) >= 0)
    //         {
    //             zapiszDane(first, it_end);
    //             it_end--; it_begin--;
    //             lista.prepend(generateDIV(0));
    //             setTimeout(()=>{
    //                 lista.firstElementChild.classList.toggle("height0");
    //             },30);
    //         }
    //     }
    //     console.log("it_begin: ",it_begin," | it_end: ", it_end);
    // }   

    // function doGory() {
    //     if(isScrolling)
    //         return;

    //     isScrolling = true;
    //     if((it_end + 1) < zdania.length)
    //     {
    //         up(lista.children[0], lista.children[1], lista.lastElementChild, "up");
    //     }
    //     else {
    //         // lista.lastElementChild.classList.toggle("block-hidden");
    //     }
    //     setTimeout(()=>{isScrolling = false}, 300)
    // }

    // function wDol() {
    //     if(isScrolling)
    //     return;
        
    //     isScrolling = true;
    //     if((it_begin - 1) >= 0)
    //     {
    //         up(lista.lastElementChild, lista.children[3], lista.children[0], "down");
    //     }
    //     else {
    //         // lista.firstElementChild.classList.toggle("block-hidden");
    //     }
            
    //     setTimeout(()=>{isScrolling = false}, 300)
    // }


    //-----------------------------------------------------------------


    // function wczytanie() {
    //     const textarea = document.querySelector("textarea"); 
    //     zdania = podzielNaZdania(textarea.value);
    //     if (zdania.length < 1) {
    //         console.log("Nie podano zdań do uzupełnienia");
    //     }
    //     else {
    //         vanishMENU();
    //         addPROGRAM();
    //         lista = document.querySelector(".lista");

    //     }
    // }

    // function vanishMENU() {
    //     const menu = document.querySelector(".input-area");
    //     menu.addEventListener("transitionend", ()=>{
    //         menu.remove();
    //     })
    //     menu.style.opacity = "0";
    // }

    // function addPROGRAM() {
    //     // dodać listę i 5 divów
    //     // sprawdzić zdania.length <= 5 to nie dodawać przycisków góra/dół
    //     let Program = document.createElement("div");
    //     Program.classList.add("lista");

    //     if(zdania.length <= 5)
    //     {
    //         for(let i = 0; i<zdania.length; i++)
    //         {
    //             let div = document.createElement("div");
    //             div.innerHTML = zdania[i].tresc;
    //             div.classList.add("block");
    //             div.setAttribute('data-before', i + ". "); 
    //             Program.append(div);
    //         }

    //         document.querySelector(".wrapper").append(Program);
    //     }
    //     else{

    //         for(let i = 0; i<5; i++)
    //         {
    //             let div = document.createElement("div");
    //             div.innerHTML = zdania[i].tresc;
    //             div.setAttribute('data-before', i + ". "); 
    //             if(i == 0 || i==4)
    //                 div.classList.add("block-hidden",  "block");
    //             else
    //                 div.classList.add("block");

    //             Program.append(div);
    //         }    
    
    //         let btn_surface = document.createElement("div");
    //         btn_surface.classList.add("btn-surface");
            
    //         {
    //             let btn1 = document.createElement("button");
    //             btn1.classList.add("btn");
    //             btn1.innerHTML = "gora";
    //             btn1.addEventListener("click", doGory);
    
    //             let btn2 = document.createElement("button");
    //             btn2.classList.add("btn");
    //             btn2.innerHTML = "dol";
    //             btn2.addEventListener("click", wDol);
    
    //             btn_surface.append(btn1);
    //             btn_surface.append(btn2);
    //         }

    //         document.querySelector(".wrapper").append(Program);
    //         document.querySelector(".wrapper").append(btn_surface);

    //     }


    // }


