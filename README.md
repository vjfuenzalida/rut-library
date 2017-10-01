# RUT formatting and validation libraries

> By Vicente Fuenzalida

Provides two functions:

*  An automatic formatting script to handle HTML text inputs.
*  A function to check if a provided text is a valid RUT (chilean national ID).

## 1. How to use

### 1.1 rutFormatter

Simply add the following line to the `<head>` section of your HTML file:

```html
<script src="scripts/rutFormatter.js" charset="utf-8"></script>
```

Then, using the `RutFormatter` object, enable/disable autoformatting in your input by simply calling
the `enable()` and `disable()` methods, passing a selector as argument.

```html
<input type="text" id="myInput" placeholder="RUT">
<script>
    // Automatically adds dots as thousands separator, and a dash as separator for the verificator digit.
    RutFormatter.enable("#myInput");

    // Disables the autoformatting script.
    RutFormatter.disable("#myInput");
</script>
```
#### Considerations: 
> RUT format is setted to a maximum of 12 characters (including the dots and dashes), following the next structure:  
`12.345.678-9`

### 1.2 rutValidator

Add the following line to the `<head>` section of your HTML file:

```html
<script src="scripts/rutValidator.js" charset="utf-8"></script>
```
Then, using the `validate()` from the `RutValidator` object, check if a given RUT is valid.

```html
<input type="text" id="myInput" placeholder="RUT">
<script>
    let rutValue = $("#myInput").val();

    // returns true if the passed RUT is valid, and false in other case.

    let valid = RutValidator.validate(value);
</script>
```

#### Considerations:

> RutValidator should be used together with the RutFormatter tool, to ensure a correct RUT structure, prior to the validation.

## 2. Contribution

If you find any errors, just [contact me](mailto:vjfuenzalida@uc.cl), or submit an issue.  

To contribute to this idea, create a new Branch and open a Pull Request to review the changes proposed.
