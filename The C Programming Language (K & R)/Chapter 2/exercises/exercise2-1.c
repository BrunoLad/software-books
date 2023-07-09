#include <stdio.h>
#include <limits.h>
#include <float.h>

/*
 * Exercise 2-1.
 * Write a program to determine the ranges of char, short,
 * int, and long variables, both signed and unsigned,
 * by printing appropriate values from standard headers and by
 * direct computation. Harder if you compute them: determine the
 * ranges of the various floating-point types.
 */

// will come back to this when arriving in the bit tricks section
int main() {

    printf("Char range is %d to %d\n", CHAR_MIN, CHAR_MAX);
    printf("Unsigned char: [%d, %d]\n", 0, UCHAR_MAX);
    printf("Short ranges from %d to %d\n", SHRT_MIN, SHRT_MAX);
    printf("Unsigned short: [%d, %d]\n", 0, USHRT_MAX);
    printf("Int range: from %d to %d\n", INT_MIN, INT_MAX);
    printf("Unsigned int: [%u, %u]\n", 0, UINT_MAX);
    printf("Long range: [%ld, %ld]\n", LONG_MIN, LONG_MAX);
    printf("Unsigned long: [%d, %lu]\n", 0, ULONG_MAX);
    printf("Float: %.6g %.6g\n", FLT_MIN, FLT_MAX);
    printf("Double: %.14g %.14g \n", DBL_MIN, DBL_MAX);

    return 0;
}
