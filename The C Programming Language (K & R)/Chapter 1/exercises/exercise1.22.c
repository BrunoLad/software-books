#include <stdio.h>

/*
 * Exercise 1-22.
 * Write a program to ``fold'' long input lines into two or more
 * shorter lines after the last non-blank character that occurs
 * before the n-th column of input. Make sure your program does
 * something intelligent with very long lines, and if there are
 * no blanks or tabs before the specified column.
 */

#define FOLDLENGTH  120
#define MAXLINE     10000
#define COLUMN      8

int getline(char line[], int maxline);
void printStr(char line[], int min, int max);
int getLastNonBlank(char line[], int min, int max);
int isNonBlankCharacter(int character);

int main() {
    int len;
    char line[MAXLINE];

    while ((len = getline(line, MAXLINE)) > 0)
        if (len <= FOLDLENGTH)
            printStr(line, 0, len);
        else {
            int count = 0;
            int i = 1;
            int pos = 0;
            while (len - count >= FOLDLENGTH) {
                int smallest = (len <= (FOLDLENGTH * i)) ? len : FOLDLENGTH * i;
                pos = getLastNonBlank(line, count, smallest);
                printStr(line, count, pos);
                printf("\n");
                count = pos + 1;
                ++i;
            }

            printStr(line, count, len);
        }

    return 0;
}

int getline(char s[], int lim) {
    int c, i;

    for (i = 0; i < lim - 1 && (c = getchar()) != EOF && c!= '\n'; ++i) {
        s[i] = c;
    }

    if (c == '\n') {
        s[i] = c;
        ++i;
    }

    s[i] = '\0';
    return i;
}

void printStr(char s[], int min, int max) {
    for (int i = min; i <= max; i++) {
        putchar(s[i]);
    }
}

int getLastNonBlank(char s[], int min, int max) {
    int pos = min;

    for (int i = min; i <= max; i++) {
        if (isNonBlankCharacter(s[i]))
            pos = i;
    }

    return pos;
}

int isNonBlankCharacter(int c) {
    return c != 'n' && c != ' ' && c != '\t';
}
