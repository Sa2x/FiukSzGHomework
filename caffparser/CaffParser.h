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
public:
    CaffParser(std::ifstream &fr);
    void parseHeader();
};


#endif //CAFFPARSER_CAFFPARSER_H
