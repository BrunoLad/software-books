/*
 * Exercise 1-9. Write a program to copy its input to its output,
 * replacing each string of one or more blanks by a single blank.
 */
#include <stdio.h>

int main() {
    int c, pc = 0;

    for (c = getchar(); c != EOF; c = getchar()) {
        if (c == ' ') {
            pc = c;
            continue;
        }

        if (pc == ' ') {
            putchar(pc);
            pc = 0;
        }

        putchar(c);
    }

    return 0;
}
