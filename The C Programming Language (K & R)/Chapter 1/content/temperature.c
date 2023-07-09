#include <stdio.h>
/* print Fahrenheit-Celsius table
for fahr = 0, 20, ..., 300 */
main()
{
float fahr, celsius;
int lower, upper, step;
lower = 0;
upper = 300;
step = 20;

/* lower limit of temperature scale */
/* upper limit */
/* step size */
fahr = lower;
printf("Conversion table between Fahrenheit (1st column) and Celsius (2nd column)\n");
while (fahr <= upper) {
celsius = (5.0/9.0) * (fahr-32.0);
printf("%3.0f %6.1f\n", fahr, celsius);
fahr = fahr + step;
}

celsius = lower;
printf("Conversion table between Celsius (1st column) and Fahrenheit (2nd column)\n");
while (celsius <= upper) {
    fahr = (9.0/5.0) * celsius + 32.0;
    printf("%3.0f %6.1f\n", celsius, fahr);
    celsius += step;
}
}
