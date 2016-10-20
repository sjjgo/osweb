"use strict";
/*
 * Definition of the class python_workspace.
 */

function python_workspace() {
    throw "The class python_workspace cannot be instantiated!";
};

/*
 * Definition of public class methods.   
 */

python_workspace._eval = function(pBytecode) {
    // Check wich type of expression must be evaled.
    if (typeof pBytecode === 'boolean') {
        return pBytecode;
    } else if (typeof pBytecode === 'string') {
        // Open sesame script, first check for parameter values. 
        pBytecode = osweb.syntax.eval_text(pBytecode);

        // Evaluate the expression.
        var eval_string = osweb.syntax.remove_quotes(pBytecode)
        if (eval_string == "always") {
            return true;
        } else if (eval_string == "never") {
            return false;
        } else {
            return eval(eval_string);
        }
    } else {
        // Python script, run the internal Python interpreter.
        return osweb.python._run_statement(pBytecode);
    }
};

python_workspace.init_globals = function() {};

// Bind the python_workspace class to the osweb namespace.
module.exports = python_workspace;