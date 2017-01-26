import { bindable, bindingMode, containerless, inject, LogManager, computedFrom } from "aurelia-framework";
import { _Control } from "../_control";
import $ from 'jquery';

let logger = LogManager.getLogger('autocomplete');
const CACHE_DURATION = 60000;

function startsWith(str, start) {
  // console.log(str);
  // str = str.toLowerCase();
  // start = start.toLowerCase()
  // return str.startsWith(start);
  return true;
}

function dispatchCustomEvent(event_name, element, data) {
  let anEvent;
  if (window.CustomEvent) {
    anEvent = new CustomEvent(event_name, {
      detail: data,
      bubbles: true
    });
  } else {
    anEvent = document.createEvent('CustomEvent');
    anEvent.initCustomEvent(event_name, true, true, {
      detail: data
    });
  }
  element.dispatchEvent(anEvent);
}

@containerless()
@inject(Element)
export class Autocomplete extends _Control {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  // dropdown properties
  @bindable loader = []; // can be either array of suggestions or function returning Promise resolving to such array
  @bindable minLength = 1; // min length of input to start search and suggest 
  @bindable template = null; // template to display a suggestion - if none string value of suggestion is shown 
  @bindable placeholder = ''; // placeholder for input control 
  @bindable filter // function to filter out suggestions
  @bindable _input; // input field value;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) key;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) text;

  _suggestions = [];
  _suggestionVisible = false;
  _ignoreInputChange = false;
  _isLoading = false;
  _noSuggestions = false;

  constructor(element) {
    super(element);
  }

  bind() {
    this._ignoreInputChange = true;
    this._input = this._getSuggestionText(this.value);
    if (this.value)
      this._suggestions = [this.value];
  }

  _inputChanged() {
    if (this._ignoreInputChange) {
      this._ignoreInputChange = false;
      return;
    }
    if (this._input === "") {
      this.value = null;
      this._noSuggestions = false;
      this._suggestions = [];
    }
    else {
      this._loadSuggestions(this._input)
        .then(suggestions => {
          this._suggestions = suggestions || [];
          this._showSuggestions();
        });
    }
  }

  _loadSuggestions(keyword) {
    this._isLoading = true;
    this._noSuggestions = false;
    this._suggestions = [this.value];

    var promise;
    if (Array.isArray(this.loader)) {
      promise = Promise.resolve(this.loader.filter(item => startsWith(this.getSuggestionValue(item), keyword)));
    } else if (typeof this.loader === 'function') {
      promise = this.loader(keyword);
    }
    return promise.then(suggestions => {
      this._isLoading = false;
      this._noSuggestions = !suggestions || !suggestions.length;
      return suggestions;
    });
  }

  _hideSuggestions() {
    this._suggestionVisible = false;
  }

  _showSuggestions() {
    if (this._suggestions && this._suggestions.length || this._noSuggestions) {
      this._suggestionVisible = true;
      this._highlightSuggestion(this.value);
    }
  }

  _selectSuggestion(suggestion) {
    this.value = suggestion;
    this._suggestions = [suggestion];
    this._ignoreInputChange = true;
    this._input = this._getSuggestionText(suggestion);
    if (this.value) {
      dispatchCustomEvent("selected", this.element, this.value);
      this._hideSuggestions();
    }
  }

  _highlightSuggestion(suggestion) {
    if (suggestion) {

    }
  }

  _getSuggestionText(suggestion) {
    if (!suggestion)
      return "";
    else if (typeof suggestion === "string")
      return suggestion;
    else if (typeof suggestion === "object" && this.text) {
      return suggestion[this.text];
    }
    else
      return suggestion.toString();
  }

  _getSuggestionKey(suggestion) {
    if (!suggestion)
      return null;
    else if (typeof suggestion === "string")
      return suggestion;
    else if (typeof suggestion === "object" && this.key) {
      return suggestion[this.key];
    }
    else
      return suggestion;
  }
}
