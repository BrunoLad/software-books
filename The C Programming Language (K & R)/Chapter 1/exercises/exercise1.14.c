#include <stdio.h>

/*
 * Exercise 1-14.
 * Write a program to print a histogram of the frequencies
 * of different characters in its input.
 */

#define ASCIILENGTH 128 // basic ascii table

int main() {
    int c, otherChar;
    int charFreq[ASCIILENGTH];

    otherChar = 0;

    for (int i = 0; i < ASCIILENGTH; i++)
        charFreq[i] = 0;

    while ((c = getchar()) != EOF)
        if (c > ASCIILENGTH)
            ++otherChar;
        else
            ++charFreq[c];

    for (int i = 0; i < ASCIILENGTH; i++) {
        putchar(i); // probably will have a problem with control characters
        printf(":");

        for (int j = 0; j < charFreq[i]; j++)
            printf("|");
        printf("\n");
    }

    printf("other:");
    for (int i = 0; i < otherChar; i++)
        printf("|");

    return 0;
}
