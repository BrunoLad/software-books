#include <stdio.h>

/*
 * Exercise 1-24.
 * Write a program to check a C program for rudimentary syntax errors
 * like unmatched parentheses, brackets and braces. Don't forget
 * about quotes, both single and double, escape sequences, and comments.
 * (This program is hard if you do it in full generality.)
 */

int main() {
    int c, prevC, lastC;
    int bracketCount, parenthesisCount, bracesCount;
    int isInsideQuotes, isInsideSQuotes, sQuotesLen;
    int isInsideSComment, isInsideMComment;
    int sQuotesError;

    bracketCount = parenthesisCount = bracesCount = 0;
    isInsideQuotes = isInsideSQuotes = 0;
    isInsideSComment = isInsideMComment = 0;
    sQuotesError = sQuotesLen = 0;

    for (c = getchar(), prevC = c, lastC = prevC; c != EOF; lastC = prevC, prevC = c, c = getchar()) {
        if (!isInsideSComment && !isInsideMComment) {
            if (isInsideSQuotes && c != '\\') {
                sQuotesLen++;
            }

            if (prevC != '\\' && !isInsideSQuotes && c == '\"')
                isInsideQuotes = !isInsideQuotes;
            if ((prevC != '\\' || (prevC == '\\' && lastC == '\\')) && !isInsideQuotes && c == '\'') {
                isInsideSQuotes = !isInsideSQuotes;
                sQuotesLen = 0;
            }

            if (!isInsideQuotes && !isInsideSQuotes) {
                if (c == '[')
                    bracketCount++;
                if (c == ']')
                    bracketCount--;
                if (c == '(')
                    parenthesisCount++;
                if (c == ')')
                    parenthesisCount--;
                if (c == '{')
                    bracesCount++;
                if (c == '}')
                    bracesCount--;

                if (prevC == '/' && c == '/')
                    isInsideSComment = 1;
                if (prevC == '/' && c == '*')
                    isInsideMComment = 1;
            }
        } else {
            if (isInsideSComment && c == '\n')
                isInsideSComment = 0;
            if (isInsideMComment && prevC == '*' && c == '/')
                isInsideMComment = 0;
        }

        if (sQuotesLen > 1)
            sQuotesError++;
    }

    if (sQuotesError)
        printf("The informed code has single quotes Error\n");
    if (isInsideQuotes)
        printf("The informed code has unterminated quotes\n");
    if (bracketCount)
        printf("The informed code has unmatched brackets. It's missing %d %c\n",
                bracketCount > 0 ? bracketCount : (-1) * bracketCount, bracketCount > 0 ? ']' : '[');
    if (parenthesisCount)
        printf("The informed code has unmatched parenthesis. It's missing %d %c\n",
                parenthesisCount > 0 ? parenthesisCount : (-1) * parenthesisCount, parenthesisCount > 0 ? ')' : '(');
    if (bracesCount)
        printf("The informed code has unmatched braces. It's missing %d %c\n",
                bracesCount > 0 ? bracesCount : (-1) * bracesCount, bracesCount > 0 ? '}' : '{');
    if (isInsideMComment)
        printf("The informed code has unterminated multiline comments\n");

    if (!sQuotesError && !isInsideQuotes && !bracketCount
            && !parenthesisCount && !bracesCount && !isInsideMComment)
        printf("There are no rudimentary syntax errors in the provided code\n");
}
