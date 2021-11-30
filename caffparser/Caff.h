//
// Created by sasa on 2021. 11. 09..
//

#ifndef CAFFPARSER_CAFF_H
#define CAFFPARSER_CAFF_H


#include <iostream>
#include "Ciff.h"

class Caff {
    unsigned long numberOfAnim;

    unsigned int creditYear;

    unsigned int creditMonth;

    unsigned int creditDay;

    unsigned int creditHour;

    unsigned int creditMinute;

    std::string creator;

    std::vector<Ciff> ciffs;

public:
    void setNumberOfAnim(unsigned long num);

    unsigned long getNumberOfAnim();

    void setCredits(int y, int m, int d, int h, int mi, std::string creator);


    void addCiff(Ciff ciff){
        ciffs.push_back(ciff);
    }
    Caff();

    void printData(){
        std::cout<<"Creator: "<<creator<<'\n';
        std::cout<<"Creation year:"<<creditYear<<'\n';
        std::cout<<"Creation month:"<<creditMonth<<'\n';
        std::cout<<"Creation day:"<<creditDay<<'\n';
        std::cout<<"Creation hour:"<<creditHour<<'\n';
        std::cout<<"Creation minute:"<<creditMinute<<'\n';
        std::cout<<"There are animations in this caff:"<<numberOfAnim<<'\n';
        for(Ciff ciff: ciffs){
            ciff.printData();
        }
    }
};


#endif //CAFFPARSER_CAFF_H
