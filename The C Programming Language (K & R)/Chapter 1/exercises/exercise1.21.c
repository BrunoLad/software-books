#include <stdio.h>

/*
 * Exercise 1-21.
 * Write a program entab that replaces strings of blanks
 * by the minimum number of tabs and blanks to achieve
 * the same spacing. Use the same tab stops as for detab.
 * When either a tab or a single blank would suffice to reach
 * a tab stop, which should be givenpreference?
 */

#define COLUMN      8   /* number of columns per tab */
#define INSPACE     1
#define OUTSPACE    0

int main() {
    int c, count, numspaces, state;

    count = numspaces = 0;
    state = OUTSPACE;

    while ((c = getchar()) != EOF) {
        if (state == INSPACE && c != ' ') {
            state = OUTSPACE;
            int diffFromMultiple = (COLUMN - (((count - 1) - numspaces) % COLUMN) % COLUMN);
            
            // After this the tab will be aligned with a column
            // that's a multiple of it's value
            if (diffFromMultiple <= numspaces) {
                putchar('\t');
                numspaces -= diffFromMultiple;
            }

            while(numspaces >= COLUMN) {
                putchar('\t');
                numspaces -= COLUMN;
            }

            for (int i = 0; i < numspaces; i++)
                putchar(' ');
            numspaces = 0;
            putchar(c);
        } else if (c == ' ') {
            state = INSPACE;
            numspaces++;
        } else {
            numspaces = 0;
            state = OUTSPACE;
            putchar(c);

            if (c == '\n') {
                count = 0;
                numspaces = 0;
            }

            if (c == '\t')
                // difference between multiples
                count += COLUMN - (count % COLUMN);
        }

        count++;
    }

    return 0;
}
