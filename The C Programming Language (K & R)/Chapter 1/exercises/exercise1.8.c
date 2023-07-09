/*
 * Exercise 1-8. Write a program to count blanks, tabs, and newlines.
*/
#include <stdio.h>

int main() {
    long nb = 0;
    int c;

    while ((c = getchar()) != EOF)
        if (c == ' ' || c == '\t' || c == '\n')
            ++nb;

    printf("Number of blanks %ld\n", nb);

    return 0;
}
