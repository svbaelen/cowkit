// SPDX-FileCopyrightText: 2024 Senne Van Baelen
//
// SPDX-License-Identifier: Apache-2.0

// Setup MiniSearch
const miniSearch = new MiniSearch({
  fields: ['title', 'text'],
  storeFields: ['title', 'text']
})


const capitalize = (string) => string.replace(/(\b\w)/gi, (char) => char.toUpperCase())

window.addEventListener('load', function () {

  // Select DOM elements
  const $app = document.querySelector('#text-body')
  const $search = document.querySelector('.Search')
  const $searchInput = document.querySelector('.Search input')
  const $clearButton = document.querySelector('.Search button.clear')
  const $searchResList = document.querySelector('.SearchResList')
  const $explanation = document.querySelector('.Explanation')
  const $suggestionList = document.querySelector('.SuggestionList')
  const $options = document.querySelector('.AdvancedOptions form')

  // Fetch and index data
  let textById = {}
  $app.classList.add('loading')

  fetch('assets/search.json')
    .then(response => response.json())
    .then((allSearch) => {
      textById = allSearch.reduce((byId, text) => {
        byId[text.id] = text
        return byId
      }, {})
      return miniSearch.addAll(allSearch)
    }).then(() => {
      $app.classList.remove('loading')
    })

  // Bind event listeners:

  // Typing into search bar updates search results and suggestions
  $searchInput.addEventListener('input', (event) => {
    const query = $searchInput.value

    const results = (query.length > 1) ? getSearchResults(query) : []
    renderSearchResults(results)

    const suggestions = (query.length > 1) ? getSuggestions(query) : []
    renderSuggestions(suggestions)
  })

  // Clicking on clear button clears search and suggestions
  $clearButton.addEventListener('click', () => {
    $searchInput.value = ''
    $searchInput.focus()

    renderSearchResults([])
    renderSuggestions([])
  })

  // Clicking on a suggestion selects it
  $suggestionList.addEventListener('click', (event) => {
    const $suggestion = event.target

    if ($suggestion.classList.contains('Suggestion')) {
      const query = $suggestion.innerText.trim()
      $searchInput.value = query
      $searchInput.focus()

      const results = getSearchResults(query)
      renderSearchResults(results)
      renderSuggestions([])
    }
  })

  // Pressing up/down/enter key while on search bar navigates through suggestions
  $search.addEventListener('keydown', (event) => {
    const key = event.key

    if (key === 'ArrowDown') {
      selectSuggestion(+1)
    } else if (key === 'ArrowUp') {
      selectSuggestion(-1)
    } else if (key === 'Enter' || key === 'Escape') {
      $searchInput.blur()
      renderSuggestions([])
    } else {
      return
    }
    const query = $searchInput.value
    const results = getSearchResults(query)
    renderSearchResults(results)
  })

  // Clicking outside of search bar clears suggestions
  $app.addEventListener('click', (event) => {
    renderSuggestions([])
  })

  // Changing any advanced option triggers a new search with the updated options
  $options.addEventListener('change', (event) => {
    const query = $searchInput.value
    const results = getSearchResults(query)
    renderSearchResults(results)
  })

  // Define functions and support variables
  const searchOptions = {
    fuzzy: 0.2,
    prefix: true,
    fields: ['title', 'artist'],
    combineWith: 'OR',
    filter: null
  }

  const getSearchResults = (query) => {
    const searchOptions = getSearchOptions()
    let res = miniSearch.search(query, searchOptions);
    return miniSearch.search(query, searchOptions).map(({ id }) => textById[id])
  }

  const getSuggestions = (query) => {
    return miniSearch.autoSuggest(query, { boost: { artist: 5 } })
      .filter(({ suggestion, score }, _, [first]) => score > first.score / 4)
      .slice(0, 5)
  }

  const renderSearchResults = (results) => {
    $searchResList.innerHTML = results.map(({ title, href, text }) => {

      let textIdx = text.toLowerCase().indexOf($searchInput.value.toLowerCase());
      let relText = `${text.substring(0, 100)}`;
      if (text.length > 100) {
        relText = `${relText} [...]`;
      }
      console.log(textIdx);
      if (textIdx > -1){
        const begin = text.substring(textIdx-50, textIdx);
        const val = `<b>${$searchInput.value}</b>`;
        //const val = `<b>${text.substring(textIdx, $searchInput.value.length)}</b>`;
        const end = text.substring(textIdx + $searchInput.value.length, textIdx + 50);
        if (text.length > 100) {
            relText = `[...] ${begin} ${val}${end} [...]`;
        } else {
            relText = `${begin}${val}${end}`;
        }
      }

      return `<li class="SearchRes">
      <a href="${href}">
        <div>
          <h4>${capitalize(title)}</h4>
          <p>
          ${relText}
          </p>
        </div>
      </a>
    </li>`
    }).join('\n')

    if (results.length > 0) {
      $app.classList.add('hasResults')
    } else {
      $app.classList.remove('hasResults')
    }
  }

  const renderSuggestions = (suggestions) => {
    $suggestionList.innerHTML = suggestions.map(({ suggestion }) => {
      return `<li class="Suggestion">${suggestion}</li>`
    }).join('\n')

    if (suggestions.length > 0) {
      $app.classList.add('hasSuggestions')
    } else {
      $app.classList.remove('hasSuggestions')
    }
  }

  const selectSuggestion = (direction) => {
    const $suggestions = document.querySelectorAll('.Suggestion')
    const $selected = document.querySelector('.Suggestion.selected')
    const index = Array.from($suggestions).indexOf($selected)

    if (index > -1) {
      $suggestions[index].classList.remove('selected')
    }

    const nextIndex = Math.max(Math.min(index + direction, $suggestions.length - 1), 0)
    $suggestions[nextIndex].classList.add('selected')
    $searchInput.value = $suggestions[nextIndex].innerText
  }

  const getSearchOptions = () => {
    const formData = new FormData($options)
    const searchOptions = {}

    searchOptions.fuzzy = formData.has('fuzzy') ? 0.2 : false
    searchOptions.prefix = formData.has('prefix')
    searchOptions.fields = formData.getAll('fields')
    searchOptions.combineWith = formData.get('combineWith')

    return searchOptions
  }

  document.addEventListener('keydown', (event) => {
    const key = event.key
    if (key === '/') {
      event.preventDefault();
      $searchInput.focus();
    }
    else if (event.target.parentElement.classList.contains("Search")){
        if (key === 'Escape') {
            $clearButton.click();
        }
    }
    else if (key === 'Escape') {
      // former is probably redundant now
      const hovered = document.querySelectorAll( ":hover" );

      hovered.forEach((el) => {
        if (el.classList.contains("SearchResList")) {
          $clearButton.click();
        }
      });
    }
  })
});
