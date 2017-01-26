import {DataAttributeObserver} from 'aurelia-binding';

export class SetAttributeBindingBehavior {
  bind(binding, source) {
    // debugger 
    binding.targetObserver = new DataAttributeObserver(binding.target, binding.targetProperty);
  }

  unbind(binding, source) {}
}
