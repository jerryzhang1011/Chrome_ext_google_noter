let element_arr = []
let local_st = JSON.parse( localStorage.getItem("input") )
const el = document.getElementById("input-btn")
const input = document.getElementById("input-el")
const lst = document.getElementById("ul")
let clear = document.getElementById("clear")
const tabBtn = document.getElementById("tab-btn")

if (local_st) {
    element_arr = local_st
    render_leads(element_arr)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        element_arr.push(tabs[0].url)
        localStorage.setItem("input", JSON.stringify(element_arr) )
        render_leads(element_arr)
    })
})

function render_leads(leads) {
    let ls_item = ""
    for (let i = 0; i < leads.length; i++) {
        ls_item += `
            <li>
                <a href="${leads[i]}">
                    ${leads [i]}
                </a>
            </li>
        `
    }
    lst.innerHTML = ls_item
}

el.addEventListener("click", function () {
    let link = input.value
    if (link) {
        element_arr.push(link)
        input.value = ""
        localStorage.setItem("input", JSON.stringify(element_arr))
        render_leads(element_arr)
    }
})

clear.addEventListener("click", function () {
    localStorage.clear()
    element_arr = []
    input.value = ""
    render_leads(element_arr)
})






