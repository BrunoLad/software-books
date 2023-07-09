#include <stdio.h>

/*
 * Exercise 1-13 - HORIZONTAL VERSION
 * Write a program to print a histogram of the lengths of words
 * in its input. It is easy to draw the histogram with the bars
 * horizontal; a vertical orientation is more challenging.
 */

#define MAXWORDLEN  20  /* maximum interval for histogram */
#define IN          1   /* from past codes/exercises */
#define OUT         0

int main() {
    int c, state, len, biggerMax;
    int nwordfreq[MAXWORDLEN];

    len = biggerMax = 0;

    for (int i = 0; i < MAXWORDLEN; i++)
        nwordfreq[i] = 0;

    state = OUT;
    for (c = getchar(); c != EOF; c = getchar()) {
        if (state == IN && (c == ' ' || c == '\t' || c == '\n')) {
            if (len > MAXWORDLEN)
                ++biggerMax;
            else
                ++nwordfreq[len - 1];

            state = OUT;
            len = 0;
        } else {
            state = IN;
            ++len;
        }
    }

    if (len > 0)
        ++nwordfreq[len - 1];
    
    printf("\n");
    for (int i = 0; i < MAXWORDLEN; i++) {
        printf("%3d:", i+1);
        for (int j = 0; j < nwordfreq[i]; j++)
            printf("|");
        printf("\n");
    }

    printf("%2d+:", MAXWORDLEN);
    for (int i = 0; i < biggerMax; i++)
        printf("|");
    printf("\n");

    return 0;
}
