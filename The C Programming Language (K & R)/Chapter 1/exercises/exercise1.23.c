#include <stdio.h>

/*
 * Exercise 1-23.
 * Write a program to remove all comments from a C program.
 * Don't forget to handle quoted strings and
 * character constants properly. C comments don't nest.
 */

int main() {
    int isInsideQuotes, isInsideSComment, isInsideMComment;
    int c, prevC, lastC;

    isInsideSComment = isInsideMComment = isInsideQuotes = 0;
    lastC = prevC = c = getchar();

    // should've gone with a for and stored value line per line in an array
    while (c != EOF) {
        if (!isInsideSComment && !isInsideMComment) {
            if (c == '\"')
                isInsideQuotes = !isInsideQuotes;
            if (!isInsideQuotes) {
                if (prevC != '/' && c == '/') {
                    lastC = prevC;
                    prevC = c;
                    c = getchar();
                    continue;
                }
                if (prevC == '/' && c == '/')
                    isInsideSComment = 1;
                if (prevC == '/' && c == '*')
                    isInsideMComment = 1;
                if (lastC !='*' && prevC == '/' && c != '/' && c != '*')
                    putchar(prevC);
            }
            if (!isInsideSComment && !isInsideMComment && (lastC != '*' || prevC != '/' || c != '\n'))
                putchar(c);
        } else {
            if (isInsideSComment && c == '\n')
                isInsideSComment = 0;
            if (isInsideMComment && prevC == '*' && c == '/')
                isInsideMComment = 0;
        }

        lastC = prevC;
        prevC = c;
        c = getchar();
    }

    return 0;
}
