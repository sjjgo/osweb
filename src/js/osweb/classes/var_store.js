"use strict";
/*
* Definition of the class var_store.
*/

function var_store(item, parent) {
    // Set the class properties. 
    this._item = item;
    this._parent = parent;
};

// Extend the class from its base class.
var p = var_store.prototype;

// Set the class default properties. 
p._item = null;
p._parent = null;

// Definition of public class methods.   

p.get = function(pVar, pDefault, pEval, pValid) {
    // Set the optional arguments
    pDefault = (typeof pDefault === 'undefined') ? null : pDefault;
    pEval = (typeof pEval === 'undefined') ? true : pEval;
    pValid = (typeof pValid === 'undefined') ? null : pValid;

    var value = null;

    // Gets an experimental variable.
    if (pVar in this) {
        if (typeof this[pVar] == 'string') {
            value = osweb.syntax.eval_text(this[pVar]);
        } else {
            value = this[pVar];
        }
    }
    // If value is not found locally, look in experiment object.
    if(value == null && this._parent && pVar in this._parent){
        if (typeof this._parent[pVar] == 'string') {
            value = osweb.syntax.eval_text(this._parent[pVar]);
        } else {
            value = this._parent[pVar];
        } 
    }

    // Return function result.
    return value;
};

p.has = function(variable) {
    // Check if the variable (property) is part of the class.         
    return this.hasOwnProperty(variable);
};

p.inspect = function() {
    // Get all variable values.
    var keys = [];
    for (var key in this) {
        keys.push(key);
    }

    // Slide default properties (HACK for removing the defauly properties/methods from the log_list). 
    keys = keys.slice(2, -7);
    
    // Return function result.
    return keys;
};

p.items = function() {
};

p.set = function(variable, value) {
    // Sets and experimental variable.
    this[variable] = value;
};

p.unset = function(variable){
    // Check if the variable exists.
    if (this.has(variable) === true) {
        // Remove the variable as property from the object.
        delete this[variable];
    }
};

p.vars = function() {
};

// Bind the vars class to the osweb namespace.
module.exports = var_store;