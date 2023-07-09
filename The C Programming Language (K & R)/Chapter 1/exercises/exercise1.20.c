#include <stdio.h>

/*
 * Exercise 1-20.
 * Write a program detab that replaces tabs in the input
 * with the proper number of blanks to space to the next tab stop.
 * Assume a fixed set of tab stops, say every n columns.
 * Should n be a variable or a symbolic parameter?
 */


#define COLUMNS 8   /* number of columns per tab */

int main() {
    int c, count;
    
    count = 0;
    for (c = getchar(); c != EOF; c = getchar())
        if (c == '\t') {
            for (int i = 0; i < COLUMNS - count; ++i)
                    putchar(' ');
            count = 0;
        } else {
            putchar(c);
            count = (c == '\n') ? 0 : (++count) % COLUMNS;
        }

    return 0;
}
