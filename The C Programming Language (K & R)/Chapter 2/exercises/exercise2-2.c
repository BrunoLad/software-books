#include <stdio.h>

/*
 * Exercise 2-2.
 * Write a loop equivalent to the for loop above
 * without using && or ||.
 */

#define MAXLINE     1000    /* maximum input line length */

int getline(char line[], int maxline);
int getlineVersion2(char line[], int maxline);
int getlineVersion3(char line[], int maxline);
int validchar(char c);

int main() {
    int len;                /* current line length */
    char line[MAXLINE];     /* current input line */

    while ((len = getlineversion3(line, MAXLINE)) > 0)
        printf("%s\n", line);

    return 0;
}

int getlineversion3(char s[], int lim) {
    int c, i = 0;

    c = getchar();

    while (validchar(c)) {
        if (i >= lim)
            break;

        s[i] = c;
        c = getchar();
        ++i;
    }

    if (c == '\n') {
        s[i] = c;
        ++i;
    }

    s[i] = '\0';

    return i;
}

int validchar(char c) {
    return c != EOF && c != '\n';
}

int getlineversion2(char s[], int lim) {
    int c, i;

    for (i = 0, c = getchar(); i < lim -1, validchar(c); ++i, c = getchar())
        s[i] = c;

    if (c == '\n') {
        s[i] = c;
        ++i;
    }

    s[i] = '\0';

    return i;
}

/* getline: read a line into s, return length */
int getline(char s[], int lim) {
    int c, i;

    for (i = 0; i < lim - 1;  ++i) {
        c = getchar();

        if (c == '\n')
            break;
        if (c == EOF)
            break;

        s[i] = c;
    }

    if (c == '\n') {
        s[i] = '\n';
        ++i;
    }

    s[i] = '\0';

    return i;
}
