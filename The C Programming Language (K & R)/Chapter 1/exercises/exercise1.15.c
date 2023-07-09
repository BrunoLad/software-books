#include <stdio.h>

/*
 * Exercise 1.15.
 * Rewrite the temperature conversion program of Section 1.2
 * to use a function for conversion.
 */

#define LOWER   0
#define UPPER   300
#define STEP    30

float convertToCelsius(float fahr);

int main() {
    int fahr;

    for (fahr = LOWER; fahr <= UPPER; fahr += STEP)
        printf("%3d %6.1f\n", fahr, convertToCelsius(fahr));

    return 0;
}

float convertToCelsius(float fahr) {
    return (5.0/9.0) * (fahr - 32);
}
