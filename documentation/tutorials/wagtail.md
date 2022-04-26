# Wagtail Developer Documentation

Documentation for how to use Wagtail as a developer and how to edit the curent website

## General Usage

In order to access Wagtail, log in to the Django Airavata portal and navigate back to the homepage using the logo in the top left corner of your screen.
Once you are on the homepage, you should see the Wagtail logo (a wagtail bird) in the bottom righthand corner.
Click on that logo and click *Go to Wagtail admin* to load the CMS.

The page that pops up will show your most recent edits (if any) and you can navigate directly to those by clicking *Edit* under any of them.
Also on that welcome page is a detailing of all the elements on the webpage including the number of pages, images, and documents.

To navigate to the pages, click the link that says *Pages* with a number above it.
This will bring you to a page listing all the child pages of "Home."
To add another page, click *+ ADD CHILD PAGE* below "Home."
To edit a current page, click on either the name of the page or the edit button below.

### Editing Elements

When you are editing a page, you have a few options for structuring the webpage.

First, the title of the page is what will be shown in the Navbar and on the tab.

Next, you need to add a row. This will generate a flex container and a bootstrap row for your content.
You can choose two types of containers: full width and max width.
I can't tell the difference between the two, but I would choose full width container to be consistent.
This container can have a background image but the styling is difficult to manage, so be prepared if you want one.

For row content, you have the following choices

---

#### Paragraph Block

A basic paragraph with a WYSIWYG editor. Can include `h1` through `h6` and almost all types of text styling.

#### Embed Block

Allows you to embed a Youtube video (and I'm guessing other embed linked items)

#### Bootstrap Jumbotron

Card for featured content. See [Bootstrap documentation](https://getbootstrap.com/docs/4.0/components/jumbotron/) for more

#### Bootstrap Button

Self-explanatory, a button. See [Bootstrap documentation](https://getbootstrap.com/docs/4.0/components/buttons/) for more

#### Bootstrap Carousel

Slideshow of content, usually images. See [Bootstrap documentation](https://getbootstrap.com/docs/4.0/components/carousel/) for more

#### Horizantal Rule

Horizantal line across page, color customized

#### Placeholder Block

Block where you can only add classes. Good for extra margins or CSS-only elements

#### IU University Block

Don't use this, it's Indiana University's footer

#### Expandable Rich Text Block

Button that toggles a paragraph block

#### Code Snippet

Add a code snippet like ``` print("Hello, World!") ``` in almost any language for display. (Does not run code)

#### Image Block

An Image. Corresponds to the `<img>` tag in HTML

#### Heading Block

`h1` to `h6` with no other text

#### Bootstrap Alert

Stylized alert. See [Bootstrap documentation](https://getbootstrap.com/docs/4.0/components/alerts/) for more

#### Bootstrap Card

Stylized card. See [Bootstrap documentation](https://getbootstrap.com/docs/4.0/components/card/) for more

#### Bootstrap Well

Stylized card, but visually seems to sink into the page instead of pop out. See [Bootstrap documentation](https://getbootstrap.com/docs/4.0/migration/#panels-thumbnails-and-wells) for more

#### Bootstrap Media Object

Heading and paragraph text with media such as an image prepended. See [Bootstrap documentation](https://getbootstrap.com/docs/4.0/components/media-object/) for more

#### Font Awesome Icon Block

An icon from the font awesome library

#### Bootstrap Embed Video

Like Embed Block but with Bootstrap stylization. See [Bootstrap documentation](https://getbootstrap.com/docs/4.0/components/embeds/) for more

#### HTML Code

Pure HTML. For when you want to bypass the automatically generated blocks.
Wagtail will not code-check these blocks, so make sure nothing crashes the webpage.

---

Once you add a block, fill out the necessary information.
The majority of them will give you a space that says *Custom Class*.
Enter a specific and unique name for the class and you should be able to apply custom CSS later.
**Wagtail uses Bootstrap, so you can also use Bootstrap classes for customization.** Each element is in a row, so you can use Bootstrap Column classes for organization.


### Editing CSS

To edit the custom CSS of the webpage, click the hamburger menu and navigate to *Snippets*.
Next, click on *Custom CSS* and then click on the link *Custom Css* that pops up.
**Do not** add a new custom CSS file as that is a pain to delete and will not actually affect the CSS of the page.

To add more CSS, either edit the relevant section denoted by the comments, or add a comment header and css block.
You will reference the classes you entered while editing the elements.

_Note_, when you save the CSS, it will automatically apply to the whole website.
There are no drafts, so be careful.
If you are applying a risky change, be sure to save the previous code.

As stated above, bootstrap classes are also used for styling. To learn more about the classes, see [Bootstrap Documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction/)

## Current Website


### Home Page

**Purpose**: The purpose of the home page is to quickly introduce new users to 
* The purpose of the RNAMake Toolkit
* Links to pages describing relevant information in more detail
* The overall aesthetic of the program
It needs to be eye-catching, but not overwhelming

#### CSS

To Edit CSS, see the __Edit CSS__ section above. The CSS for the documentation page is under the CSS Comment `--- Home Page ---` and contains the following classes currently: `home-heading`, `home-heading-text`, `home-heading-img`, `page-preview-wrapper`, `top-margin-big`, `home-heading-container`, `preview-col`

#### HTML

To edit HTML, see the __Editing Elements__ section above. This section will detail any possibly confusing sections of design.

The Home page utilizes some custom HTML blocks in order to maintain positioning and flexibility. These are used to add surrounding `div`s (containers) to elements. There will be pairs of blocks surrounding the elements with the first containing one or more divs like follows:
```HTML
<div class="classes">
```
and the second will have the exact same number of closing tags as follows
```HTML
</div>
```
or it will also contain a new opening tag which will be closed in a subsequent blocl
```HTML
</div>
<div class="classes">
```

### Contacts Page

**Purpose**: The purpose of the contacts page is to introduce the maintainers of the project as well as the developers. It needs to provide the users with points of contact in case something goes wrong or in case they want more information.

#### CSS

To Edit CSS, see the __Edit CSS__ section above. The CSS for the documentation page is under the CSS Comment `--- Home Page ---` and contains the following classes currently: `contact-header`, `contact-heading-block`, `contact-container`, `contact-card-caption`, `caption-container`, `team-contact-container`, `team-contact-img`

The purposes of these classes is commented directly in the CSS.

#### HTML

To edit HTML, see the __Editing Elements__ section above. This section will detail any possibly confusing sections of design.

The Contacts page utilizes some custom HTML blocks as containers. For more information, see the __Home page__ section.

### Documentation Page

**Purpose**: The purpose of the documentation page is to provide users with any open-source information regarding the project. This could be repositories, access to the console app, or information on how to use the application.

#### CSS

To Edit CSS, see the __Edit CSS__ section above. The CSS for the documentation page is under the CSS Comment `--- Documentation Page ---` and contains two classes currently: `doc-header` and `doc-section`.

**`doc-header`**: class used for the header of the documentation page. It currently centers the header and adds 50px of space below the header.

**`doc-section`**: class used for each individual section of documentation. This class should be used for all future sections as well to maintain styling. It currently adds 20px of space below the element.

#### HTML

To edit HTML, see the __Editing Elements__ section above. This section will detail any possibly confusing sections of design.

Each Paragraph section can be duplicated and formatting will be preserved. Just ensure the classes `doc-section col-6` are the same in each new section. `col-6` is a bootstrap class that uses half the page (6/12 units of the page to be exact). If you would like to use a different proportion of the page, you can replace the number `6` with another number out of 12 to have the unit take up that proportion of space. Make sure any group of elements have column numbers adding up to 12 or else formatting will be wrong. if you would like to have one element on a line but have it take up less than 12 units of space, add a blank element and have  it cover the remaining columns.

### About Page

**Purpose**: The purpose of the about page is to provide users with non-tutorial information about the project such as funding sources, lab information, news stories, or related papers/conference presentations.