function load() {    
    const textarea = document.querySelector("textarea"); 
    const btn_load = document.querySelector("#btn-load");

    
    if (!isMobile())
        shortcutsShow();
    
    if(textarea.value != ""){
        const text = searchGaps(textarea.value);

        textarea.remove();
        btn_load.remove();
    
        const input_area = document.querySelector(".input-area");
        input_area.append(transformedDIV(text));
        input_area.append(btn_generateWORD());
    }
}

function searchGaps(text) {

    let gap_start = text.indexOf("_");
    let index = 0;
    const input_partOne = "<input type='text' class='ramka' index='" ;

    while (gap_start != -1) {
        let gap_end = gap_start
        for (; text[gap_end + 1] == "_"; gap_end++);

        // Splitting sentence
        const firstPart = text.slice(0, gap_start);
        const secondPart = text.slice(gap_end + 1);

        text = `${firstPart}${input_partOne}${index++}'>${secondPart}`;

        //Next index
        gap_start = text.indexOf("_", gap_end + 1);
    }

    return text;
}


function transformedDIV(tekst) {
    const div = document.createElement("div");
    div.classList.add("wczytane");
    div.innerHTML = tekst;

    return div;
}

function btn_generateWORD() {   
    const btn = document.createElement("button");
    btn.setAttribute("id","btn-load");
    btn.innerText = "generate";
    btn.addEventListener("click", generateWORD);

    return btn;
}

function generateWORD() {

    const input_area = document.querySelector(".wczytane");
    const inputVector = input_area.children;

    let input_area_text = input_area.innerHTML;
    let text="";

    let gap_start = input_area_text.indexOf("<");
    let gap_end = 0;
    let index = 0;

    while (gap_start != -1) {
        let inputValue = inputVector[index++].value;

        //Text before '<' of input
        const pierwszaCzesc = input_area_text.slice(gap_end, gap_start);

        if(inputValue == "")
            inputValue = "_____";

        text += `${pierwszaCzesc}<b><u>${inputValue}</u></b`;

        //Search of next input
        gap_end = input_area_text.indexOf(">", gap_start);
        gap_start = input_area_text.indexOf("<", gap_end + 1);
    }
    console.log(input_area_text.slice(gap_end));

    text += ">" + input_area_text.slice(gap_end+1);

    Export2Word(text);

}

function Export2Word(tekst = " ", filename = 'filledText') {
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

function shortcutsShow() {
    
    const shortcuts = document.querySelector(".shortcuts");
    shortcuts.classList.remove("opacity-0");

    setTimeout(()=>{


        shortcuts.addEventListener("transitionend", ()=>{
            document.querySelector(".shortcuts").remove();
        })
        shortcuts.classList.add("opacity-0");
    },15000);
}

function isMobile() {
    const user = navigator.userAgent;
    return (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(user));
}

document.querySelector("#btn-load").addEventListener("click", load) 