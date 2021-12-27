package akros.projectoverview.Argos.persistence.entities.documents;

import io.micrometer.core.lang.Nullable;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
@Document
public class MandateDescription {

    @Nullable
    private String description;

    @Nullable
    private String profile;

}
