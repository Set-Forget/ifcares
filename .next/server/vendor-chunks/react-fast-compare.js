"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-fast-compare";
exports.ids = ["vendor-chunks/react-fast-compare"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-fast-compare/index.js":
/*!**************************************************!*\
  !*** ./node_modules/react-fast-compare/index.js ***!
  \**************************************************/
/***/ ((module) => {

eval("\nvar isArray = Array.isArray;\nvar keyList = Object.keys;\nvar hasProp = Object.prototype.hasOwnProperty;\nvar hasElementType = typeof Element !== \"undefined\";\nfunction equal(a, b) {\n    // fast-deep-equal index.js 2.0.1\n    if (a === b) return true;\n    if (a && b && typeof a == \"object\" && typeof b == \"object\") {\n        var arrA = isArray(a), arrB = isArray(b), i, length, key;\n        if (arrA && arrB) {\n            length = a.length;\n            if (length != b.length) return false;\n            for(i = length; i-- !== 0;)if (!equal(a[i], b[i])) return false;\n            return true;\n        }\n        if (arrA != arrB) return false;\n        var dateA = a instanceof Date, dateB = b instanceof Date;\n        if (dateA != dateB) return false;\n        if (dateA && dateB) return a.getTime() == b.getTime();\n        var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;\n        if (regexpA != regexpB) return false;\n        if (regexpA && regexpB) return a.toString() == b.toString();\n        var keys = keyList(a);\n        length = keys.length;\n        if (length !== keyList(b).length) return false;\n        for(i = length; i-- !== 0;)if (!hasProp.call(b, keys[i])) return false;\n        // end fast-deep-equal\n        // start react-fast-compare\n        // custom handling for DOM elements\n        if (hasElementType && a instanceof Element && b instanceof Element) return a === b;\n        // custom handling for React\n        for(i = length; i-- !== 0;){\n            key = keys[i];\n            if (key === \"_owner\" && a.$$typeof) {\n                continue;\n            } else {\n                // all other properties should be traversed as usual\n                if (!equal(a[key], b[key])) return false;\n            }\n        }\n        // end react-fast-compare\n        // fast-deep-equal index.js 2.0.1\n        return true;\n    }\n    return a !== a && b !== b;\n}\n// end fast-deep-equal\nmodule.exports = function exportedEqual(a, b) {\n    try {\n        return equal(a, b);\n    } catch (error) {\n        if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {\n            // warn on circular references, don't crash\n            // browsers give this different errors name and messages:\n            // chrome/safari: \"RangeError\", \"Maximum call stack size exceeded\"\n            // firefox: \"InternalError\", too much recursion\"\n            // edge: \"Error\", \"Out of stack space\"\n            console.warn(\"Warning: react-fast-compare does not handle circular references.\", error.name, error.message);\n            return false;\n        }\n        // some other error. we should definitely know about these\n        throw error;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtZmFzdC1jb21wYXJlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBRUEsSUFBSUEsVUFBVUMsTUFBTUQsT0FBTztBQUMzQixJQUFJRSxVQUFVQyxPQUFPQyxJQUFJO0FBQ3pCLElBQUlDLFVBQVVGLE9BQU9HLFNBQVMsQ0FBQ0MsY0FBYztBQUM3QyxJQUFJQyxpQkFBaUIsT0FBT0MsWUFBWTtBQUV4QyxTQUFTQyxNQUFNQyxDQUFDLEVBQUVDLENBQUM7SUFDakIsaUNBQWlDO0lBQ2pDLElBQUlELE1BQU1DLEdBQUcsT0FBTztJQUVwQixJQUFJRCxLQUFLQyxLQUFLLE9BQU9ELEtBQUssWUFBWSxPQUFPQyxLQUFLLFVBQVU7UUFDMUQsSUFBSUMsT0FBT2IsUUFBUVcsSUFDZkcsT0FBT2QsUUFBUVksSUFDZkcsR0FDQUMsUUFDQUM7UUFFSixJQUFJSixRQUFRQyxNQUFNO1lBQ2hCRSxTQUFTTCxFQUFFSyxNQUFNO1lBQ2pCLElBQUlBLFVBQVVKLEVBQUVJLE1BQU0sRUFBRSxPQUFPO1lBQy9CLElBQUtELElBQUlDLFFBQVFELFFBQVEsR0FDdkIsSUFBSSxDQUFDTCxNQUFNQyxDQUFDLENBQUNJLEVBQUUsRUFBRUgsQ0FBQyxDQUFDRyxFQUFFLEdBQUcsT0FBTztZQUNqQyxPQUFPO1FBQ1Q7UUFFQSxJQUFJRixRQUFRQyxNQUFNLE9BQU87UUFFekIsSUFBSUksUUFBUVAsYUFBYVEsTUFDckJDLFFBQVFSLGFBQWFPO1FBQ3pCLElBQUlELFNBQVNFLE9BQU8sT0FBTztRQUMzQixJQUFJRixTQUFTRSxPQUFPLE9BQU9ULEVBQUVVLE9BQU8sTUFBTVQsRUFBRVMsT0FBTztRQUVuRCxJQUFJQyxVQUFVWCxhQUFhWSxRQUN2QkMsVUFBVVosYUFBYVc7UUFDM0IsSUFBSUQsV0FBV0UsU0FBUyxPQUFPO1FBQy9CLElBQUlGLFdBQVdFLFNBQVMsT0FBT2IsRUFBRWMsUUFBUSxNQUFNYixFQUFFYSxRQUFRO1FBRXpELElBQUlyQixPQUFPRixRQUFRUztRQUNuQkssU0FBU1osS0FBS1ksTUFBTTtRQUVwQixJQUFJQSxXQUFXZCxRQUFRVSxHQUFHSSxNQUFNLEVBQzlCLE9BQU87UUFFVCxJQUFLRCxJQUFJQyxRQUFRRCxRQUFRLEdBQ3ZCLElBQUksQ0FBQ1YsUUFBUXFCLElBQUksQ0FBQ2QsR0FBR1IsSUFBSSxDQUFDVyxFQUFFLEdBQUcsT0FBTztRQUN4QyxzQkFBc0I7UUFFdEIsMkJBQTJCO1FBQzNCLG1DQUFtQztRQUNuQyxJQUFJUCxrQkFBa0JHLGFBQWFGLFdBQVdHLGFBQWFILFNBQ3pELE9BQU9FLE1BQU1DO1FBRWYsNEJBQTRCO1FBQzVCLElBQUtHLElBQUlDLFFBQVFELFFBQVEsR0FBSTtZQUMzQkUsTUFBTWIsSUFBSSxDQUFDVyxFQUFFO1lBQ2IsSUFBSUUsUUFBUSxZQUFZTixFQUFFZ0IsUUFBUSxFQUFFO2dCQUtsQztZQUNGLE9BQU87Z0JBQ0wsb0RBQW9EO2dCQUNwRCxJQUFJLENBQUNqQixNQUFNQyxDQUFDLENBQUNNLElBQUksRUFBRUwsQ0FBQyxDQUFDSyxJQUFJLEdBQUcsT0FBTztZQUNyQztRQUNGO1FBQ0EseUJBQXlCO1FBRXpCLGlDQUFpQztRQUNqQyxPQUFPO0lBQ1Q7SUFFQSxPQUFPTixNQUFNQSxLQUFLQyxNQUFNQTtBQUMxQjtBQUNBLHNCQUFzQjtBQUV0QmdCLE9BQU9DLE9BQU8sR0FBRyxTQUFTQyxjQUFjbkIsQ0FBQyxFQUFFQyxDQUFDO0lBQzFDLElBQUk7UUFDRixPQUFPRixNQUFNQyxHQUFHQztJQUNsQixFQUFFLE9BQU9tQixPQUFPO1FBQ2QsSUFBSSxNQUFPQyxPQUFPLElBQUlELE1BQU1DLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLHVCQUF5QkYsTUFBTUcsTUFBTSxLQUFLLENBQUMsWUFBYTtZQUNoRywyQ0FBMkM7WUFDM0MseURBQXlEO1lBQ3pELGtFQUFrRTtZQUNsRSxnREFBZ0Q7WUFDaEQsc0NBQXNDO1lBQ3RDQyxRQUFRQyxJQUFJLENBQUMsb0VBQW9FTCxNQUFNTSxJQUFJLEVBQUVOLE1BQU1DLE9BQU87WUFDMUcsT0FBTztRQUNUO1FBQ0EsMERBQTBEO1FBQzFELE1BQU1EO0lBQ1I7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2lmY2FyZXMvLi9ub2RlX21vZHVsZXMvcmVhY3QtZmFzdC1jb21wYXJlL2luZGV4LmpzPzRmNDkiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIga2V5TGlzdCA9IE9iamVjdC5rZXlzO1xudmFyIGhhc1Byb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGhhc0VsZW1lbnRUeXBlID0gdHlwZW9mIEVsZW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG5mdW5jdGlvbiBlcXVhbChhLCBiKSB7XG4gIC8vIGZhc3QtZGVlcC1lcXVhbCBpbmRleC5qcyAyLjAuMVxuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgJiYgYiAmJiB0eXBlb2YgYSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PSAnb2JqZWN0Jykge1xuICAgIHZhciBhcnJBID0gaXNBcnJheShhKVxuICAgICAgLCBhcnJCID0gaXNBcnJheShiKVxuICAgICAgLCBpXG4gICAgICAsIGxlbmd0aFxuICAgICAgLCBrZXk7XG5cbiAgICBpZiAoYXJyQSAmJiBhcnJCKSB7XG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggIT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgICAgaWYgKCFlcXVhbChhW2ldLCBiW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGFyckEgIT0gYXJyQikgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGRhdGVBID0gYSBpbnN0YW5jZW9mIERhdGVcbiAgICAgICwgZGF0ZUIgPSBiIGluc3RhbmNlb2YgRGF0ZTtcbiAgICBpZiAoZGF0ZUEgIT0gZGF0ZUIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZUEgJiYgZGF0ZUIpIHJldHVybiBhLmdldFRpbWUoKSA9PSBiLmdldFRpbWUoKTtcblxuICAgIHZhciByZWdleHBBID0gYSBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgLCByZWdleHBCID0gYiBpbnN0YW5jZW9mIFJlZ0V4cDtcbiAgICBpZiAocmVnZXhwQSAhPSByZWdleHBCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHJlZ2V4cEEgJiYgcmVnZXhwQikgcmV0dXJuIGEudG9TdHJpbmcoKSA9PSBiLnRvU3RyaW5nKCk7XG5cbiAgICB2YXIga2V5cyA9IGtleUxpc3QoYSk7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cbiAgICBpZiAobGVuZ3RoICE9PSBrZXlMaXN0KGIpLmxlbmd0aClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgIGlmICghaGFzUHJvcC5jYWxsKGIsIGtleXNbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gZW5kIGZhc3QtZGVlcC1lcXVhbFxuXG4gICAgLy8gc3RhcnQgcmVhY3QtZmFzdC1jb21wYXJlXG4gICAgLy8gY3VzdG9tIGhhbmRsaW5nIGZvciBET00gZWxlbWVudHNcbiAgICBpZiAoaGFzRWxlbWVudFR5cGUgJiYgYSBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgYiBpbnN0YW5jZW9mIEVsZW1lbnQpXG4gICAgICByZXR1cm4gYSA9PT0gYjtcblxuICAgIC8vIGN1c3RvbSBoYW5kbGluZyBmb3IgUmVhY3RcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoa2V5ID09PSAnX293bmVyJyAmJiBhLiQkdHlwZW9mKSB7XG4gICAgICAgIC8vIFJlYWN0LXNwZWNpZmljOiBhdm9pZCB0cmF2ZXJzaW5nIFJlYWN0IGVsZW1lbnRzJyBfb3duZXIuXG4gICAgICAgIC8vICBfb3duZXIgY29udGFpbnMgY2lyY3VsYXIgcmVmZXJlbmNlc1xuICAgICAgICAvLyBhbmQgaXMgbm90IG5lZWRlZCB3aGVuIGNvbXBhcmluZyB0aGUgYWN0dWFsIGVsZW1lbnRzIChhbmQgbm90IHRoZWlyIG93bmVycylcbiAgICAgICAgLy8gLiQkdHlwZW9mIGFuZCAuX3N0b3JlIG9uIGp1c3QgcmVhc29uYWJsZSBtYXJrZXJzIG9mIGEgcmVhY3QgZWxlbWVudFxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFsbCBvdGhlciBwcm9wZXJ0aWVzIHNob3VsZCBiZSB0cmF2ZXJzZWQgYXMgdXN1YWxcbiAgICAgICAgaWYgKCFlcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gZW5kIHJlYWN0LWZhc3QtY29tcGFyZVxuXG4gICAgLy8gZmFzdC1kZWVwLWVxdWFsIGluZGV4LmpzIDIuMC4xXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gYSAhPT0gYSAmJiBiICE9PSBiO1xufVxuLy8gZW5kIGZhc3QtZGVlcC1lcXVhbFxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4cG9ydGVkRXF1YWwoYSwgYikge1xuICB0cnkge1xuICAgIHJldHVybiBlcXVhbChhLCBiKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoKGVycm9yLm1lc3NhZ2UgJiYgZXJyb3IubWVzc2FnZS5tYXRjaCgvc3RhY2t8cmVjdXJzaW9uL2kpKSB8fCAoZXJyb3IubnVtYmVyID09PSAtMjE0NjgyODI2MCkpIHtcbiAgICAgIC8vIHdhcm4gb24gY2lyY3VsYXIgcmVmZXJlbmNlcywgZG9uJ3QgY3Jhc2hcbiAgICAgIC8vIGJyb3dzZXJzIGdpdmUgdGhpcyBkaWZmZXJlbnQgZXJyb3JzIG5hbWUgYW5kIG1lc3NhZ2VzOlxuICAgICAgLy8gY2hyb21lL3NhZmFyaTogXCJSYW5nZUVycm9yXCIsIFwiTWF4aW11bSBjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIlxuICAgICAgLy8gZmlyZWZveDogXCJJbnRlcm5hbEVycm9yXCIsIHRvbyBtdWNoIHJlY3Vyc2lvblwiXG4gICAgICAvLyBlZGdlOiBcIkVycm9yXCIsIFwiT3V0IG9mIHN0YWNrIHNwYWNlXCJcbiAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogcmVhY3QtZmFzdC1jb21wYXJlIGRvZXMgbm90IGhhbmRsZSBjaXJjdWxhciByZWZlcmVuY2VzLicsIGVycm9yLm5hbWUsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBzb21lIG90aGVyIGVycm9yLiB3ZSBzaG91bGQgZGVmaW5pdGVseSBrbm93IGFib3V0IHRoZXNlXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG4iXSwibmFtZXMiOlsiaXNBcnJheSIsIkFycmF5Iiwia2V5TGlzdCIsIk9iamVjdCIsImtleXMiLCJoYXNQcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJoYXNFbGVtZW50VHlwZSIsIkVsZW1lbnQiLCJlcXVhbCIsImEiLCJiIiwiYXJyQSIsImFyckIiLCJpIiwibGVuZ3RoIiwia2V5IiwiZGF0ZUEiLCJEYXRlIiwiZGF0ZUIiLCJnZXRUaW1lIiwicmVnZXhwQSIsIlJlZ0V4cCIsInJlZ2V4cEIiLCJ0b1N0cmluZyIsImNhbGwiLCIkJHR5cGVvZiIsIm1vZHVsZSIsImV4cG9ydHMiLCJleHBvcnRlZEVxdWFsIiwiZXJyb3IiLCJtZXNzYWdlIiwibWF0Y2giLCJudW1iZXIiLCJjb25zb2xlIiwid2FybiIsIm5hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-fast-compare/index.js\n");

/***/ })

};
;