#include <stdio.h>

/*
 * Exercise 1-16.
 * Revise the main routine of the longest-line program
 * so it will correctly print the length of arbitrary long
 * input lines, and as much as possible of the text.
 */

#define MAXLINE 1000    /* maximum input line length */

int getline(char line[], int maxline);
void copy(char to[], char from[]);

/* print the longest input line */
int main() {
    int len;                /* current line length */
    int max;                /* maximum length seen so far */
    char line[MAXLINE];     /* current input line */
    char longest[MAXLINE];  /* longest line saved here */

    max = 0;

    while ((len = getline(line, MAXLINE)) > 0)
        if (len > max) {
            max = len;
            copy(longest, line);
        }
    if (max > 0) /* there was a line */
        printf("Length of longest line: %d\n", max);
        printf("%s\n", longest);

    return 0;
}

/* getline: read a line into s, return length */
int getline(char s[], int lim) {
    int c, i;

    for (i = 0; i < lim - 1 && (c = getchar()) != EOF && c != '\n'; ++i)
        s[i] = c;
    if (c == '\n') {
        s[i] = c;
        ++i;
    } else if (c != EOF) {
        s[i] = '\0';
        while ((c = getchar()) != EOF)
            ++i;
        return i;
    }

    s[i] = '\0';
    return i;
}

/*copy: copy 'from' into 'to'; assumes to is big enough */
void copy (char to[], char from[]) {
    int i;

    i = 0;
    while((to[i] = from[i]) != '\0')
        ++i;
}
