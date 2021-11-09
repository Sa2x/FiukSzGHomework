//
// Created by sasa on 2021. 11. 05..
//

#ifndef CAFFPARSER_CAFFPARSER_H
#define CAFFPARSER_CAFFPARSER_H


#include <fstream>
#include "Caff.h"

class CaffParser {
private:
    std::ifstream& fr;
    Caff caff;
    unsigned long eightbytestoint(char* arr);

    void parseBlock();

    void parseAnimation(unsigned long length);

    void parseHeader();

    int parseId();
public:
    CaffParser(std::ifstream &fr);



    void parse();


    unsigned long parseEightBytesToInt();

    void parseCredentials(unsigned long length);
};


#endif //CAFFPARSER_CAFFPARSER_H
