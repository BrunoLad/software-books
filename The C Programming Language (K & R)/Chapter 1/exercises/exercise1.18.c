#include <stdio.h>

/*
 * Exercise 1-18.
 * Write a program to remove trailing blanks and tabs
 * from each line of input, and to delete entirely blank lines.
 */

#define MAXLINE     1000    /* maximum input line length */
#define IN          1       /* inside word */
#define OUT         0       /* outside word */

int isInsideWord(int c);
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
    int c, i, state;

    state = OUT;
    for (i = 0; i < lim - 1 && (c = getchar()) != EOF && c != '\n';) {
        if (state == OUT && !isInsideWord(c))
            continue;
        else if (isInsideWord(c))
            state = IN;
        else if (!isInsideWord(c))
            state = OUT;

        s[i] = c;
        ++i;
    }
    if (c == '\n') {
        s[i] = c;
        ++i;
    }

    s[i] = '\0';
    if (i > 1)
        printf("%s", s);
    return i;
}

/*copy: copy 'from' into 'to'; assumes to is big enough */
void copy (char to[], char from[]) {
    int i;

    i = 0;
    while((to[i] = from[i]) != '\0')
        ++i;
}

int isInsideWord(int c) {
    return c != ' ' && c != '\t' && c != '\n';
}
