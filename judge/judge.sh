#!/bin/bash

# OPTIONS:
#
# -t <test cases folder>
# -s <source file>
# 
# COMPILER OPTIONS:
# 
# -r : racket
# -p : prolog 
# 
# 
# OUTPUT:
# 
# <Number of passed test cases>
# <1 for accept, 0 for wrong answer, -1 for compilation/runtime error>

TEMP_FILE="/tmp/$(date +%Y%m%d%H%M%S)"

prologCommand() 
{
	$(prolog $1 < $2 > "$TEMP_FILE.out" 2> /dev/null)
}

racketCommand() 
{
	$(cat $1 > "$TEMP_FILE.in")
	$(cat $2 >> "$TEMP_FILE.in")

	$(racket "$TEMP_FILE.in" > "$TEMP_FILE.out")
}


while getopts "t:s:rp" OPT; do
	case "$OPT" in

	"t") 
		CASES=$OPTARG
		;;

	"s") 
		SOURCE=$OPTARG
		;;

	"r") 
		COMPILER="racket"
	;;

	"p") 
		COMPILER="prolog"
		;;

	esac
done

if [[ ! -f $SOURCE ]]; then 
	echo "Source file doesn't exist!"
	exit 1
fi

if [[ ! -d $CASES ]]; then 
	echo "Test cases folder doesn't exist!"
	exit 1
fi


PASSED=$((0))
RESULT="1"

for FILE in $(find "$CASES" -iname "*.in"  | cut -f 1 -d '.')
do
	if [[ ! -f "$FILE.out" ]]
	then
		echo "Missing $FILE.out on folder $CASES"
		exit 1
	else
		case "$COMPILER" in 
			"prolog")
				prologCommand "$SOURCE" "$FILE.in"
				;;
		
			"racket")
				racketCommand "$SOURCE" "$FILE.in"
				;;
			*)
				echo "Didn't specify compiler to be used!"
				exit 1
		esac
		
		if [[ ! $? -eq $((0)) ]]
		then
			# Compilatior/Execution Error
			RESULT="-1"
			break
		fi

		$(diff "$FILE.out" "$TEMP_FILE.out" > /dev/null)

		if [[ ! $? -eq $((0)) ]]
		then
			RESULT="0"
			break
		else		
			((PASSED++))
		fi
	fi
done

$(rm "$TEMP_FILE.out" "$TEMP_FILE.in" 2> /dev/null)

echo $PASSED
echo $RESULT