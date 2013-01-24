POV = $(wildcard *.pov)
PNG = $(POV:.pov=.png)

all: png
png: $(PNG)

$(PNG): %.png : %.pov
	povray $<


