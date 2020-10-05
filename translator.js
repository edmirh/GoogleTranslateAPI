const languages={"af":"Afrikaans","sq":"Albanian","am":"Amharic","ar":"Arabic ","hy":"Armenian","az":"Azerbaijani","eu":"Basque","be":"Belarusian","bn":"Bengali","bs":"Bosnian","bg":"Bulgarian","ca":"Catalan","ceb":"Cebuano","zh-CN":"Chinese","co":"Corsican","hr":"Corsican","cs":"Czech","da":"Danish","nl":"Dutch","en":"English","eo":"Esperanto","et":"Estonian","fi":"Finnish","fr":"French","fy":"Frisian","gl":"Galician","ka":"Georgian","de":"German","el":"Greek","gu":"Gujarati","ht":"Haitian Cr","ha":"Hausa","haw":"Hawaiian","he":"Hebrew","hi":"Hindi","hmn":"Hmong","hu":"Hungarian","is":"Icelandic","ig":"Igbo","id":"Indonesian","ga":"Irish","it":"Italian","ja":"Japanese","jv":"Javanese","kn":"Kannada","kk":"Kazakh","km":"Khmer","rw":"Kinyarwanda","ko":"Korean","ku":"Kurdish","ky":"Kyrgyz","lo":"Lao","la":"Latin","lv":"Latvian","lt":"Lithuanian","lb":"Luxembourgish","mk":"Macedonian","mg":"Malagasy","ms":"Malay","ml":"Malayalam","mt":"Maltese","mi":"Maori","mr":"Marathi","mn":"Mongolian","my":"Myanmar","ne":"Nepali","no":"Norwegian","ny":"Nyanja","or":"Odia","ps":"Pashto","fa":"Persian","pl":"Polish","pt":"Portuguese","pa":"Punjabi","ro":"Romanian","ru":"Russian","sm":"Samoan","gd":"Scots G","sr":"Serbian","st":"Sesotho","sn":"Shona","sd":"Sindhi","si":"Sinhala","sk":"Slovak","sl":"Slovenian","so":"Somali","es":"Spanish","su":"Sundanese","sw":"Swahili","sv":"Swedish","tl":"Tagalog","tg":"Tajik","ta":"Tamil","tt":"Tatar","te":"Telugu","th":"Thai","tr":"Turkish","tk":"Turkmen","uk":"Ukrainian","ur":"Urdu","ug":"Uyghur","uz":"Uzbek","vi":"Vietnamese","cy":"Welsh","xh":"Xhosa","yi":"Yiddish","yo":"Yoruba","zu":"Zulu"}
let sourceLang='auto';
let targetLang='en';
const textArea=document.getElementById('translatedText');

jQuery(".dropbtn-src-mobile").on('click',function(event) {
    jQuery(".modal-src").toggle()
    jQuery(".dropdown-content-src-mobile").toggle()
    jQuery(".lang-src-mobile").toggleClass("addPadding")
})

jQuery(".dropbtn-tar-mobile").on('click', function(event){
    jQuery(".modal-tar").toggle()
    jQuery(".dropdown-content-tar-mobile").toggle()
    jQuery(".lang-tar-mobile").toggleClass("addPadding")
})

jQuery(".lang-src-mobile").on('click',function(event) {
    jQuery(".lang-src-mobile").removeClass('active')
    jQuery(this).addClass('active')
    sourceLang=event.target.id;
    const lang=jQuery(this).text()
    jQuery(".first-src-mobile").html(lang).addClass('active')
        jQuery(".lang-src-mobile").on('click',function(event){jQuery(".modal-src").toggle()
        jQuery(".dropdown-content-src-mobile").toggle()
    });
});

jQuery(".lang-tar-mobile").on('click', function(event) {
    jQuery(".lang-tar-mobile").removeClass('active')
    jQuery(this).addClass('active')
    targetLang=event.target.id;
    const lang=jQuery(this).text()
    jQuery(".first-tar-mobile").html(lang).addClass('active')
    jQuery(".lang-tar-mobile").on('click', function(event) {
        jQuery(".modal-tar").toggle()
        jQuery(".dropdown-content-tar-mobile").toggle()
    });
});

jQuery("#sourceText-mobile, #menu-card-source-mobile, #menu-card-target-mobile").on('click change keyup paste',function() {
    const sourceText=document.getElementById('sourceText-mobile').value;
    let detected=''
    if(sourceLang=="auto") {
        const url='https://translation.googleapis.com/language/translate/v2/detect?key=AIzaSyDWjIrvFDwpNF3kqdkpjHj3xjMn46MjRyU';
        const request=fetch(url,{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({q:sourceText}),
        })
        .then(response=>response.json())
        .then(data=>{detected=data.data.detections[0][0].language;
            jQuery(".first-src-mobile").html(languages[detected])
        });
        const callUrl='https://translation.googleapis.com/language/translate/v2?key=AIzaSyDWjIrvFDwpNF3kqdkpjHj3xjMn46MjRyU';
        callAPI(callUrl,detected,targetLang,sourceText)
    }
    else {
        const url='https://translation.googleapis.com/language/translate/v2?key=AIzaSyDWjIrvFDwpNF3kqdkpjHj3xjMn46MjRyU';
        callAPI(url,sourceLang,targetLang,sourceText)
    }
});
jQuery(".lang-src").on('click',function(event) {
    jQuery(".lang-src").removeClass('active')
    jQuery(this).addClass('active')
    jQuery(".dropdown-content").css('display','none')
    sourceLang=event.target.id;
    
    if(sourceLang!="en"&&sourceLang!="es"&&sourceLang!="fr"&&sourceLang!="auto") {
        const lang=jQuery(this).text()
        jQuery(".second-src").html(lang).addClass('active')
    }
});
        
jQuery(".lang-tar").on('click',function(event) {
    jQuery(".lang-tar").removeClass('active')
    jQuery(this).addClass('active')
    targetLang=event.target.id;
    
    if(targetLang!="en"&&targetLang!="es"&&targetLang!="fr"&&targetLang!="pt"){
        const lang=jQuery(this).text()
    jQuery(".first-tar").html(lang).addClass('active')
    }
});

jQuery(".dropbtn-src").on('click',function(event) {
    jQuery(".dropdown-content-src").toggle()
    jQuery("#sourceText").toggle()
    jQuery(".icon-src").toggleClass('rotated')
})

jQuery(".dropbtn-tar").on('click',function(event) {
    jQuery(".dropdown-content-tar").toggle()
    jQuery("#translatedText").toggle()
    jQuery(".icon-tar").toggleClass('rotated')
})

jQuery("#sourceText, #menu-card-source, #menu-card-target").on('click change keyup paste', function() {
    const sourceText=document.getElementById('sourceText').value;
    let detected=''
    if(sourceLang=="auto") {
        const url='https://translation.googleapis.com/language/translate/v2/detect?key=AIzaSyDWjIrvFDwpNF3kqdkpjHj3xjMn46MjRyU';
        const request= fetch(url, {
            method:'POST',
            headers:{'Content-Type':'application/json',
        },
            body:JSON.stringify({q:sourceText}),
        })
        .then(response=>response.json())
        .then(data=>{detected=data.data.detections[0][0].language;
            jQuery(".first-src").html(languages[detected])
        });
        const callUrl='https://translation.googleapis.com/language/translate/v2?key=AIzaSyDWjIrvFDwpNF3kqdkpjHj3xjMn46MjRyU';
        callAPI(callUrl,detected,targetLang,sourceText)
    } 
    else{
        jQuery(".first-src").html("Detect")
        const url='https://translation.googleapis.com/language/translate/v2?key=AIzaSyDWjIrvFDwpNF3kqdkpjHj3xjMn46MjRyU';
        callAPI(url,sourceLang,targetLang,sourceText)
    }
});

function callAPI(url,sourceLang,targetLang,sourceText) {
    const request = fetch(url, {
        method:'POST',
        headers:
            {'Content-Type':'application/json',
        },
        body:JSON.stringify({source:sourceLang,target:targetLang,format:"text",q:sourceText}),
    })
    .then(response=>response.json())
    .then(data=>{textArea.value=data.data.translations[0].translatedText;
        const textAreaMobile=document.getElementById('translatedText-mobile');
        textAreaMobile.value=data.data.translations[0].translatedText;
    });
};
