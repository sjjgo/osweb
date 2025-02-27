/* eslint-disable no-tabs */
export const osexpString = `---
API: 2
OpenSesame: 3.1.4
Platform: nt
---
set width 1024
set uniform_coordinates yes
set title "New experiment"
set subject_parity even
set subject_nr 0
set start experiment
set sound_sample_size -16
set sound_freq 48000
set sound_channels 2
set sound_buf_size 1024
set round_decimals 2
set height 768
set fullscreen no
set form_clicks no
set foreground white
set font_underline no
set font_size 18
set font_italic no
set font_family mono
set font_bold no
set experiment_path "C:/xampp/htdocs/osweb/test-osexp"
set disable_garbage_collection yes
set description "The main experiment item"
set coordinates uniform
set compensation 0
set canvas_backend xpyriment
set bidi no
set background black

define sequence experiment
	set flush_keyboard yes
	set description "Runs a number of items in sequence"
	run getting_started always
	run welcome always
	run new_sketchpad always

define notepad getting_started
	__note__
	Welcome to OpenSesame 3.1 "Jazzy James"!
	If you are new to OpenSesame, it is a good idea to follow one of the tutorials,
	which can be found on the documentation site:
	- <http://osdoc.cogsci.nl/>
	You can also check out the examples. These can be opened via:
	- Menu -> Tools -> Example experiments.
	And feel free to ask for help on the forum:
	- <http://forum.cogsci.nl/>
	Have fun with OpenSesame!
	__end__
	set description "A simple notepad to document your experiment. This plug-in does nothing."

define sketchpad new_sketchpad
	set duration keypress
	set description "Displays stimuli"
	draw textline center=1 color=white font_bold=no font_family=Arial font_italic=no font_size=18 html=yes show_if=always text="<b>Dit moet bold<i>Dit is fout</b></i>" x=0 y=0 z_index=0
	draw line color=white penwidth=1 show_if=always x1=-32 x2=32 y1=0 y2=0 z_index=0
	draw line color=white penwidth=1 show_if=always x1=0 x2=0 y1=-32 y2=32 z_index=0

define sketchpad welcome
	set start_response_interval no
	set reset_variables no
	set duration keypress
	set description "Displays stimuli"
	set background 55
	draw textline center=1 color=white font_bold=no font_family="Times New Roman" font_italic=no font_size=32 html=yes show_if=always text="<h2>OpenSesame 3.1 <i>Jazzy James</i></h2>" x=0 y=-160 z_index=0
	draw line color=white penwidth=1 show_if=always x1=-32 x2=32 y1=0 y2=0 z_index=0
	draw line color=white penwidth=1 show_if=always x1=0 x2=0 y1=-32 y2=32 z_index=0
	draw textline center=1 color=white font_bold=no font_family=Arial font_italic=no font_size=32 html=yes show_if=always text="The <em>quick</em> <span style=color:brown>brown</span> fox <span style=text-decoration:underline>jumps</span> <strike>over</strike> the <b>lazy</b> dog.<p></br>What else can we try?</p>Name: OpenSesame<br>Version: 3.2.1" x=0 y=0 z_index=0
`
