#include <stdio.h>

/*
 * Exercise 1-13 - VERTICAL VERSION
 * Write a program to print a histogram of the lengths of words
 * in its input. It is easy to draw the histogram with the bars
 * horizontal; a vertical orientation is more challenging.
 */

#define MAXWORDLEN  15  /* maximum interval for histogram */
#define IN          1   /* from past codes/exercises */
#define OUT         0

// should be improved by controlling the display/format of the medium in which the histogram is being printed
// such as using a launcher script which opens a new terminal with specific formatting
// Can also be improved by spacing the columns appropiately according to number size
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

    int largest = nwordfreq[0];

    for (int i = 1; i < MAXWORDLEN; i++)
        if (nwordfreq[i] > largest)
            largest = nwordfreq[i];
    if (biggerMax > largest)
        largest = biggerMax;
    
    printf("\n");
    for (int i = largest; i > 0; i--) {
        for (int j = 0; j <= MAXWORDLEN; j++) {
            if (j == MAXWORDLEN) {
                if (biggerMax >= i)
                    printf("_");
            } else {
                if (nwordfreq[j] >= i)
                    printf("_");
                printf("\t");
            }
        }
        printf("\n");
    }

    for (int i = 0; i < MAXWORDLEN; i++)
        printf("%d\t", i+1);
    printf("%d+\n", MAXWORDLEN);

    return 0;
}
