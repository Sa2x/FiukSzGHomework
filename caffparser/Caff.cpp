//
// Created by sasa on 2021. 11. 09..
//

#include "Caff.h"

void Caff::setNumberOfAnim(unsigned long num) {
    this->numberOfAnim = num;
}

unsigned long Caff::getNumberOfAnim(){
    return this->numberOfAnim;
}

void Caff::setCredits(int y, int m, int d, int h, int mi, std::string _creator) {
    this->creditYear=y;
    this->creditMonth=m;
    this->creditDay=d;
    this->creditHour=h;
    this->creditMinute=mi;
    this->creator=_creator;
}

Caff::Caff() {

}

